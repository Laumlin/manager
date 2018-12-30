import React, { Component } from 'react'
import { Card, Form, Input, Radio, Switch, DatePicker, TimePicker, Upload, Icon, InputNumber, Select, Checkbox, Button } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea
const rowObject = {
  minRows: 4, 
  maxRows: 6
}

class FormRegister extends Component {
  state = {
    imageUrl: '',
    loading: false
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  handleSubmit = () => {
    // const userInfo = this.props.form.getFieldsValue()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }

    return (
      <div>
        <Card title='注册表单'>
          <Form layout='horizontal'>
            <FormItem label='用户名' {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    { 
                      required: true,
                      message: '用户名不能为空！' 
                    }
                  ]
                })(
                  <Input placeholder='请输入用户名' />
                )
              }
            </FormItem>
            <FormItem label='密码' {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空！'
                    }
                  ]
                })(
                  <Input type='password' placeholder='请输入密码' />
                )
              }    
            </FormItem>
            <FormItem label='性别' {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1'
                })(
                  <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </RadioGroup>
                )
              }    
            </FormItem>
            <FormItem label='年龄' {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber />
                )
              }    
            </FormItem>
            <FormItem label='当前状态' {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '3'
                })(
                  <Select>
                    <Option value='1'>咸鱼一条</Option>
                    <Option value='2'>单身</Option>
                    <Option value='3'>恋爱</Option>
                    <Option value='4'>分手</Option>
                    <Option value='5'>结婚</Option>
                  </Select>
                )
              }    
            </FormItem>
            <FormItem label='爱好' {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['1', '5', '7']
                })(
                  <Select mode='multiple'>
                    <Option value='1'>游泳</Option>
                    <Option value='2'>跑步</Option>
                    <Option value='3'>篮球</Option>
                    <Option value='4'>爬山</Option>
                    <Option value='5'>游戏</Option>
                    <Option value='6'>钓鱼</Option>
                    <Option value='7'>旅游</Option>
                  </Select>
                )
              }    
            </FormItem>
            <FormItem label='是否结婚' {...formItemLayout}>
              {
                getFieldDecorator('isMarry', {
                  valuePropName: 'checked',
                  initialValue: false
                })(
                  <Switch />
                )
              }    
            </FormItem>
            <FormItem label='生日' {...formItemLayout}>
              {
                getFieldDecorator('birthDay', {
                  initialValue: moment('1996-03-22 12:32:00')
                })(
                  <DatePicker 
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'/>
                )
              }    
            </FormItem>
            <FormItem label='联系地址' {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '广州大学城'
                })(
                  <TextArea 
                    autosize={rowObject}
                  />
                )
              }    
            </FormItem>
            <FormItem label='早起时间' {...formItemLayout}>
              {
                getFieldDecorator('time', {
                  initialValue: moment('08:30:00', 'HH:mm:ss')
                })(
                  <TimePicker />
                )
              }    
            </FormItem>
            <FormItem label='头像' {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType='picture-card'
                    action='//jsonplaceholder.typicode.com/posts/'
                    showUploadList={false}
                    onChange={this.handleChange}
                  >
                    { this.state.imageUrl ? <img src={this.state.imageUrl} alt='' /> : <Icon type={this.state.loading ? 'loading' : 'plus'} />}
                  </Upload>
                )
              }    
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('userImg')(
                  <Checkbox>我已阅读过<a href='/#'>xx协议</a></Checkbox>
                )
              }    
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('userImg')(
                 <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                )
              }    
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormRegister)