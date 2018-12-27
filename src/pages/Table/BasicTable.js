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
        state: '单身',
        interest: '1',
        address: '广州大学城'
      },
      {
        username: 'laumlin',
        sex: '1',
        state: '单身',
        interest: '1',
        address: '广州大学城'
      },
      {
        username: 'laumlin',
        sex: '1',
        state: '单身',
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
        }
      }
    }).then(res => {
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
        dataIndex: 'sex'
      },
      {
        title: '状态',
        dataIndex: 'state'
      },
      {
        title: '爱好',
        dataIndex: 'interest'
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
        <Card title='基础表格' style={{}}>
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