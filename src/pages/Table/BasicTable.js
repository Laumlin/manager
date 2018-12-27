import React, { Component } from 'react'
import { Card, Table } from 'antd'
import axios from './../../axios'

class BasicTable extends Component {
  state = {}

  componentDidMount() {
    const dataSource = [
      {
        username: 'laumlin',
        sex: '1',
        state: '1',
        interest: '1',
        address: '广州大学城'
      },
      {
        username: 'laumlin',
        sex: '1',
        state: '2',
        interest: '1',
        address: '广州大学城'
      },
      {
        username: 'laumlin',
        sex: '1',
        state: '4',
        interest: '1',
        address: '广州大学城'
      }
    ]
    dataSource.map((item, index) => item.key=index)
    this.setState({
      dataSource
    })

    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: 1
        },
        isShowLoading: true
      }
    }).then(res => {
      res.result.list.map((item, index) => {
        item.key = index
      })
      this.setState({
        dataSource2: res.result.list
      })
    })
  }

  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
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
        dataIndex: 'address'
      }
    ]
    return (
      <div>
        <Card title='基础表格'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          >
          </Table>
        </Card>
        <Card title='动态渲染表格-Mock' style={{marginTop: 10}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          >
          </Table>
        </Card>
      </div>
    )
  }
}

export default BasicTable