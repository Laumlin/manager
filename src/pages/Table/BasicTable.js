import React, { Component } from 'react'
import { Card, Table } from 'antd'

class BasicTable extends Component {
  state = {}

  componentDidMount() {
    const dataSource = [
      {
        userName: 'laumlin',
        sex: '1',
        state: '单身',
        interest: '1',
        address: '广州大学城'
      },
      {
        userName: 'laumlin',
        sex: '1',
        state: '单身',
        interest: '1',
        address: '广州大学城'
      },
      {
        userName: 'laumlin',
        sex: '1',
        state: '单身',
        interest: '1',
        address: '广州大学城'
      }
    ]

    this.setState({
      dataSource
    })
  }

  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'userName'
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
      </div>
    )
  }
}

export default BasicTable