import React, { Component } from 'react'
import { Card, Table, Modal, Button, message, Form } from 'antd'
import axios from './../../axios'
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item

class Order extends Component {
  state = {
    orderInfo: {},
    orderConfirmVisible: false
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      width: 100,
      placeholder: '全部',
      initialValue: '0',
      list: [{id: '0', name: '全部'}, {id: '1', name: '北京市'}, {id: '2', name: '深圳市'}, {id: '3', name: '上海市'},]
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      width: 100,
      placeholder: '全部',
      initialValue: '0',
      list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '2', name: '进行中（临时停车）'}, {id: '3', name: '已结束'},]
    }
  ]

  componentDidMount() {
    this.requestList()
  }
  
  requestList = () => {
    axios.requestList(this, '/order/list', this.params)
  }

  handleFilter = (params) => {
    this.params = params
    this.requestList()
  }

  // 订单结束确认
  handleConfirm = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      })
      return 
    }
    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params: {
          orderId: item.id
        },
        isShowLoading: false
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          orderInfo: res.result,
          orderConfirmVisible: true
        })
      }
    })
  }

  // 结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then(res => {
      if (res.code === 0) {
        message.success('订单结束成功')
        this.setState({
          orderConfirmVisible: false
        })
        this.requestList()
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
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }

    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type='primary' style={{marginRight: 25}} onClick={this.openOrderDetail}>订单详情</Button>
          <Button type='primary' onClick={this.handleConfirm}>结束订单</Button>
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
        <Modal
          title='结束订单'
          visible={this.state.orderConfirmVisible}
          onCancel={() => {
            this.setState({
              orderConfirmVisible: false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form>
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Order