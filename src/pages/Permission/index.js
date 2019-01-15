import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ETable from '../../components/ETable'
import axios from '../../axios'
import utils from '../../utils/utils'

class Permission extends Component {

  state = {}

  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/role/list', this.params)
  }

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render(time) {
          return utils.formatDate(time)
        }
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          return status === 1 ? '启用' : '停用'
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render(time) {
          return utils.formatDate(time)
        }
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ]
    return (
      <div>
        <Card style={{marginBottom: 10}}>
          <Button type='primary'>创建角色</Button>
          <Button type='primary' style={{margin: '0 10px'}}>设置权限</Button>
          <Button type='primary'>用户授权</Button>
        </Card>
        <div className='content-wrap'>
          <ETable 
            columns={columns}
            dataSource={this.state.dataSource}
            updateSelectedItem={utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
          />
        </div>
      </div>
    )
  }
}

export default Permission