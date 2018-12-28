import React, { Component } from 'react'
import { Card, Table, Modal, message, Button } from 'antd'
import axios from './../../axios'

class HighTable extends Component {
  state = {}

  params = {
    page: 1
  }

  componentDidMount() {
    this.getTableList()
  }

  getTableList = () => {
    axios.ajax({
      url: '/table/high/list',
      data: {
        params: {
          page: this.params.page
        },
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        res.result.list.map((item, index) => item.key = index)
        this.setState({
          dataSource: res.result.list
        })
      }
    })
  }

  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
        render(state) {
          let config = {
            1: '咸鱼一条',
            2: '单身',
            3: '恋爱',
            4: '分手',
            5: '自由'
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: 80,
        render(interest) {
          let config = {
            1: '游泳',
            2: '篮球',
            3: '跑步',
            4: '爬山',
            5: '桌球',
            6: '旅游',
            7: '钓鱼'
          } 
          return config[interest]
        }
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      }
    ]

    const columns2 = [
      {
        title: '用户名',
        dataIndex: 'username',
        width: 80,
        fixed: 'left'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
        render(state) {
          let config = {
            1: '咸鱼一条',
            2: '单身',
            3: '恋爱',
            4: '分手',
            5: '自由'
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: 80,
        render(interest) {
          let config = {
            1: '游泳',
            2: '篮球',
            3: '跑步',
            4: '爬山',
            5: '桌球',
            6: '旅游',
            7: '钓鱼'
          } 
          return config[interest]
        }
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 80
      }
    ]


    return (
      <div>
        <Card title='头部固定'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{y: 240}}
          >
          </Table>
        </Card>
        <Card title='左侧固定' style={{marginTop: 10}}>
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{x: 2400}}
          >
          </Table>
        </Card>
      </div>
    )
  }
}

export default HighTable