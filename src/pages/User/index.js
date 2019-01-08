import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select, Message } from 'antd'
import axios from '../../axios'
import utils from '../../utils/utils'
import ETable from '../../components/ETable'
import BaseForm from '../../components/BaseForm'
import moment from 'moment'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

class User extends Component {

  state = {
    isVisible: false
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      field: 'user_name',
      placeholder: '请输入用户名称',
      width: 140
    },
    {
      type: 'INPUT',
      label: '用户手机号',
      field: 'user_mobile',
      placeholder: '请输入用户手机号',
      width: 160
    },
    {
      type: 'DATE',
      label: '请选择入职时间',
      field: 'user_date',
      placeholder: '请输入日期'
    }
  ]

  componentDidMount() {
    this.requestList()
  }

  handleFilter = (params) => {
    this.params = params
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  // 员工操作
  handleOperate = (type) => {
    let item = this.state.selectedItem
    if (type === 'create') {
      this.setState({
        type,
        isVisible:true,
        title:'创建员工'
      })
    } else if (type === 'edit') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return 
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item
      })
    } else if (type === 'detail') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return 
      }
      this.setState({
        type,
        isVisible: true,
        title: '员工详情',
        userInfo: item
      })
    } else {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return 
      }
      Modal.confirm({
        title: '确认删除',
        content: '是否要删除当前选中的员工',
        onOk: this.handleDelete
      })
    }
  }

  // 删除员工确认回调
  handleDelete = () => {
    axios.ajax({
      url: '/user/delete',
      data: {
        params: {
          id: this.state.selectedItem.id
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          isVisible: false,
          selectedRowKeys: []
        })
        Message.success('删除成功')
        this.requestList()
      }
    })
  }

  // 创建员工提交
  handleSumbit = () => {
    let type = this.state.type
    let data = this.userForm.props.form.getFieldValue()
    axios.ajax({
      url: type==='create' ? '/user/add' : '/user/edit',
      data: {
        params: data
      }
    }).then(res => {
      if (res.code === 0) {
        this.userForm.props.form.resetFields()
        this.setState({
          isVisible: false
        })
        this.requestList()
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '手机号',
        dataIndex: 'user_mobile'
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          return {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
           }[state]
        }
      },
      {
        title: '入职时间',
        dataIndex: 'user_date'
      },
      {
        title: '联系方式',
        dataIndex: 'address'
      },
      {
        title: '早期时间',
        dataIndex: 'time'
      }
    ]

    let footer = {}
    if (this.state.type === 'detail') {
      footer = {
        footer: null
      }
    }
    return (
      <div>
        <Card>
           <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card className='operate-wrap' style={{marginTop: 10}}>
          <Button type='primary' icon='plus' onClick={()=>{ this.handleOperate('create') }}>创建员工</Button>
          <Button type='primary' icon='edit' onClick={()=>{ this.handleOperate('edit') }}>编辑员工</Button>
          <Button type='primary' onClick={()=>{ this.handleOperate('detail') }}>员工详情</Button>
          <Button type='primary' icon='delete' onClick={()=>{ this.handleOperate('delete') }}>删除员工</Button>
        </Card>
        <div className='content-wrap'>
          <ETable 
            columns={columns}
            dataSource={this.state.dataSource}
            updateSelectedItem={utils.updateSelectedItem.bind(this)}
            selectedItem={this.state.selectedItem}
            selectedRowKeys={this.state.selectedRowKeys}
            pagination={this.state.pagination}
          />
        </div>
        <Modal 
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSumbit}
          onCancel={() => {
            this.userForm.props.form.resetFields()
            this.setState({
              isVisible: false
            })
          }}
          width={600}
          {...footer}
        >
          <UserForm 
            type={this.state.type}
            userInfo={this.state.userInfo}
            wrappedComponentRef={(form) => this.userForm=form}
          />
        </Modal>
      </div>
    )
  }
}

class UserForm extends Component {

  getSex = (sex) => {
    return sex === 1 ? '男' : '女'
  }

  getState = (state) => {
    return {
      '1': '游泳',
      '2': '打篮球',
      '3': '踢足球',
      '4': '跑步',
      '5': '爬山',
     }[state]
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    let type = this.props.type
    let userInfo = this.props.userInfo || {}
    return (
      <div>
        <Form>
          <FormItem label='用户名' {...formItemLayout}>
            {
              type === 'detail' ? userInfo.user_name : 
              getFieldDecorator('user_name', {
                initialValue: userInfo.user_name
              })(
                <Input type='text' placeholder='请输入用户名' />
              )
            }
          </FormItem>
          <FormItem label='性别' {...formItemLayout}>
            {
              type === 'detail' ? this.getSex(userInfo.sex) : 
              getFieldDecorator('sex', {
                initialValue: userInfo.sex
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          <FormItem label='状态' {...formItemLayout}>
            {
              type === 'detail' ?  this.getState(userInfo.state) : 
              getFieldDecorator('state', {
                initialValue: userInfo.state
              })(
                <Select>
                  <Option value={1}>咸鱼</Option>
                  <Option value={2}>程序猿</Option>
                  <Option value={3}>射技师</Option>
                  <Option value={4}>创业者</Option>
                  <Option value={5}>风华浪子</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label='入职时间' {...formItemLayout}>
            {
              type === 'detail' ? userInfo.user_date :
              getFieldDecorator('user_date', {
                initialValue: moment(userInfo.user_date)
              })(
                <DatePicker />
              )
            }
          </FormItem>
          <FormItem label='地址' {...formItemLayout}>
            {
              type === 'detail' ? userInfo.address : 
              getFieldDecorator('address', {
                initialValue: userInfo.address
              })(
                <TextArea rows={3} placeholder='请输入联系地址' />
              )
            }
          </FormItem>
        </Form>
      </div>
    )
  }
}

UserForm = Form.create()(UserForm)

export default User