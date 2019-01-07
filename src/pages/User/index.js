import React, { Component } from 'react'
import { Card, Button } from 'antd'
import axios from '../../axios'
import utils from '../../utils/utils'
import ETable from '../../components/ETable'
import BaseForm from '../../components/BaseForm'

class User extends Component {

  state = {}

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

  handleOperate = (type) => {
    
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
           }[state];
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
      </div>
    )
  }
}

export default User