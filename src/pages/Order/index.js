import React, { Component } from 'react'
import { Card, Table, Modal, message, Button, Form, Select, TimePicker } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option

class Order extends Component {
  state = {}

  params = {
    page: 1
  }

  componentDidMount() {
    this.requireList()
  }

  requireList = () => {
    let _this = this
    axios.ajax({
      url: '/order/list',
      data: {
        params: {
          page: this.params.page
        },
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        res.result.item_list.map((item, index) => item.key=index)
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

  onRowClick = (record, index) => {
    let selectKey = [index]
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }

  openOrderDetail = () => {
    let item = this.state.selectedItem
    console.log(item)
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      })
      return
    }
    window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }

  render() {
    const columns = [
      {
          title:'订单编号',
          dataIndex:'order_sn'
      },
      {
          title: '车辆编号',
          dataIndex: 'bike_sn'
      },
      {
          title: '用户名',
          dataIndex: 'user_name'
      },
      {
          title: '手机号',
          dataIndex: 'mobile'
      },
      {
          title: '里程',
          dataIndex: 'distance',
          render(distance){
              return distance/1000 + 'Km';
          }
      },
      {
          title: '行驶时长',
          dataIndex: 'total_time'
      },
      {
          title: '状态',
          dataIndex: 'status'
      },
      {
          title: '开始时间',
          dataIndex: 'start_time'
      },
      {
          title: '结束时间',
          dataIndex: 'end_time'
      },
      {
          title: '订单金额',
          dataIndex: 'total_fee'
      },
      {
          title: '实付金额',
          dataIndex: 'user_pay'
      }
    ]

    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }

    return (
      <div>
        <Card>
          <FormFilter />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type='primary' style={{marginRight: 25}} onClick={this.openOrderDetail}>订单详情</Button>
          <Button type='primary'>结束订单</Button>
        </Card>
        <div className='content-wrap'>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
          />
        </div>
      </div>
    )
  }
}

class FormFilter extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout='inline'>
        <FormItem label='城市'>
          {
            getFieldDecorator('city_id')(
              <Select 
                style={{width: 100}}
                placeholder='全部'
              >
                <Option value=''>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='2'>深圳市</Option>
                <Option value='3'>上海市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='订单时间'>
          {
            getFieldDecorator('start_time')(
              <TimePicker showTime format='YYYY-MM-DD HH:mm:ss' />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('end_time')(
              <TimePicker showTime format='YYYY-MM-DD HH:mm:ss' />
            )
          }
        </FormItem>
        <FormItem label='订单状态'>
          {
            getFieldDecorator('status')(
              <Select 
                style={{width: 100}}
                placeholder='全部'
              >
                <Option value=''>全部</Option>
                <Option value='1'>进行中</Option>
                <Option value='2'>进行中（临时停车）</Option>
                <Option value='3'>已结束</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type='primary' style={{margin: '0 25px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

FormFilter = Form.create()(FormFilter)

export default Order