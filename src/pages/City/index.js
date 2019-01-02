import React, { Component } from 'react'
import { Card, Table, Modal, message, Button, Form, Select } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item
const Option = Select.Option

class City extends Component {
  state = {
    isShowOpenCity: false
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      placeholder: '全部',
      width: 100,
      initialValue: '0',
      list: [
        {id: '0', name: '全部'}, {id: '1', name: '北京市'}, {id: '2', name: '深圳市'}, {id: '3', name: '上海市'},
      ]
    },
    {
      type: 'SELECT',
      label: '用车模式',
      field: 'mode',
      placeholder: '全部',
      width: 140,
      initialValue: '0',
      list: [
        {id: '0', name: '全部'}, {id: '1', name: '指定停车点模式'}, {id: '2', name: '禁停区模式'},
      ]
    },
    {
      type: 'SELECT',
      label: '运营模式',
      field: 'op_mode',
      placeholder: '全部',
      width: 140,
      initialValue: '0',
      list: [
        {id: '0', name: '全部'}, {id: '1', name: '自营'}, {id: '2', name: '加盟'},
      ]
    },
    {
      type: 'SELECT',
      label: '加盟商授权状态',
      field: 'auth_status',
      placeholder: '全部',
      width: 140,
      initialValue: '0',
      list: [
        {id: '0', name: '全部'}, {id: '1', name: '已授权'}, {id: '2', name: '未授权'},
      ]
    },
  ]

  componentDidMount() {
    this.requireList()
  }

  requireList = () => {
    let _this = this
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      },
      isShowLoading: true
    }).then(res => {
      if (res.code === 0) {
        res.result.item_list.map((item, index) => item.key = index)
        this.setState({
          dataSource: res.result.item_list,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current
            _this.requireList()
          })
        })
      }
    })
  }

  handleFilter = (params) => {
    this.params = params
    this.requireList()
  }

  // 开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }

  // 城市开通提交
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue()
    console.log(cityInfo)
    axios.ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      }
    }).then(res => {
      if (res.code === 0) {
        message.success('开通成功')
        this.setState({
          isShowOpenCity: false
        })
        this.requireList()
      }
    })
  }

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode === 1 ? '停车点' : '禁停区'
        }
      },
      {
        title: '运营模式',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode === 1 ? '自营' : '加盟'
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map(item => {
            return item.user_name
          }).join('，')
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formatDate
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]
    return (
      <div>
        <Card >
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className='content-wrap'>
          <Table 
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={this.state.pagination}/>
        </div>
        <Modal 
          title='城市开通'
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}>
          <OpenCityForm wrappedComponentRef={(form) => { this.cityForm = form }} />
        </Modal>
      </div>
    )
  }
}

class OpenCityForm extends Component {
  render() {
    const formLItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <FormItem label='选择城市' {...formLItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })( 
              <Select style={{width: 100}}>
                <Option value=''>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='2'>深圳市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='运营模式' {...formLItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: '1'
            })(
              <Select style={{width: 100}}>
                <Option value='1'>自营</Option>
                <Option value='2'>加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='用车模式' {...formLItemLayout}>
          {
            getFieldDecorator('use_mode', {
              initialValue: '1'
            })(
              <Select style={{width: 120}}>
                <Option value='1'>指定停车点</Option>
                <Option value='2'>禁停区</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

OpenCityForm = Form.create()(OpenCityForm)
export default City