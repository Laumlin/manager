import React, { Component } from 'react'
import { Card, Table, Modal, Button } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from '../../components/BaseForm'

class Order extends Component {
  state = {}

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
    this.requireList()
  }
  
  requireList = () => {
    let _this = this
    axios.ajax({
      url: '/order/list',
      data: {
        params: this.params,
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

  handleFilter = (params) => {
    this.params = params
    this.requireList()
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
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
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

export default Order