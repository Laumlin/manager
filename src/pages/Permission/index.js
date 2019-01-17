import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input, Select, Tree, Transfer } from 'antd'
import ETable from '../../components/ETable'
import axios from '../../axios'
import utils from '../../utils/utils'
import menuConfig from './../../config/menuConfig'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode

class Permission extends Component {

  state = {
    isRoleVisible: false,
    isPermVisible: false,
    isUserVisible: false,
  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/role/list', this.params)
  }

  // 打开创建角色弹框
  handleCreateRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }

  // 角色提交
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue()
    axios.ajax({
      url: '/role/create',
      data: {
        params: data
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          isRoleVisible: false
        })
        this.roleForm.props.form.resetFields()
        this.requestList()
      }
    })
  }

  // 权限设置
  handlePermission = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一个角色'
      })
      return
    }
    this.setState({
      isPermVisible: true,
      detailInfo: this.state.selectedItem
    })

    let menuList = this.state.selectedItem.menus
    this.setState({
      menuInfo: menuList
    })
  }

  // 设置权限提交
  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue()
    data.role_id = this.state.selectedItem.id
    data.menus = this.state.menuInfo

    axios.ajax({
      url: '/permission/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          isPermVisible: false
        })
        this.requestList()
      }
    })
  }

  // 打开用户授权弹框
  handleUserAuth = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一个角色'
      })
      return
    }
    this.getRoleUserList(item.id)
    this.setState({
      isUserVisible: true,
      detailInfo: item
    })
  }

  getRoleUserList = (id) => {
    axios.ajax({
      url: '/role/user_list',
      data: {
        params: { id }
      }
    }).then(res => {
      if (res.code === 0) {
        this.getAuthUserList(res.result)
      }
    })
  }

  // 筛选目标用户
  getAuthUserList = (dataSource) => {
    const mockData = [] 
    const targetKeys = []
    if (dataSource && dataSource.length > 0) {
      for (let i=0; i<dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        }
        if (data.status === 1) {
          targetKeys.push(data.key)
        }
        mockData.push(data)
      }
    }
    this.setState({ mockData, targetKeys })
  }

  // 用户授权提交
  handleUserSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys || []
    data.role_id = this.state.selectedItem.id

    axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          isUserVisible: false
        })
        this.requestList()
      }
    })
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
          <Button type='primary' onClick={this.handleCreateRole}>创建角色</Button>
          <Button type='primary' style={{margin: '0 10px'}} onClick={this.handlePermission}>设置权限</Button>
          <Button type='primary' onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className='content-wrap'>
          <ETable 
            columns={columns}
            dataSource={this.state.dataSource}
            updateSelectedItem={utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
          />
        </div>
        <Modal
          title='创建角色'
          visible={this.state.isRoleVisible}
          onCancel={() => {
            this.roleForm.props.form.resetFields()
            this.setState({
              isRoleVisible: false
            })
          }}
          onOk={this.handleRoleSubmit}
        > 
          <RoleForm wrappedComponentRef={(form) => this.roleForm=form}/>
        </Modal>

        <Modal
          width={600}
          title='权限设置'
          visible={this.state.isPermVisible}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
          onOk={this.handlePermEditSubmit}
        > 
          <PermEditForm 
            wrappedComponentRef={(form) => this.permForm=form}
            detailInfo={this.state.detailInfo} 
            menuInfo={this.state.menuInfo || []}
            patchMenuInfo={(checkedKeys) => {
              this.setState({
                menuInfo: checkedKeys
              })
            }}
          />
        </Modal>

        <Modal
          width={800}
          title='用户授权'
          visible={this.state.isUserVisible}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            })
          }}
          onOk={this.handleUserSubmit}
        > 
          <RoleAuthForm 
            wrappedComponentRef={(form) => this.userAuthForm=form}
            detailInfo={this.state.detailInfo} 
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys
              })
            }}
          />
        </Modal>
      </div>
    )
  }
}

class RoleForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 18
      }
    }

    return (
      <Form>
        <FormItem label='角色名称' {...formItemLayout}>
          {
            getFieldDecorator('role_name', {
              initialValue: ''
            })(
              <Input type='text' placeholder='请输入角色名称' />
            )
          }
        </FormItem>
        <FormItem label='状态' {...formItemLayout}>
          {
            getFieldDecorator('state', {
              initialValue: 1
            })(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

RoleForm = Form.create()(RoleForm)

class PermEditForm extends Component {

  renderTreeNodes = (data) => {
    return data.map(item => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      } else {
        return <TreeNode {...item} />
      }
    })
  }

  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const detail_info = this.props.detailInfo
    const menuInfo = this.props.menuInfo
    return (
      <Form>
        <FormItem label='角色名称' {...formItemLayout} >
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label='状态' {...formItemLayout} >
          {
            getFieldDecorator('status', {
              initialValue: 1
            })(
              <Select>
                <Option value={1}>启用</Option>
                <Option value={0}>停用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree 
          checkable
          defaultExpandAll
          onCheck={this.onCheck}
          checkedKeys={menuInfo}
        >
          <TreeNode  title='平台权限' key='platform_all'>
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}

PermEditForm = Form.create()(PermEditForm)

class RoleAuthForm extends Component {

  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys) // 改变父组件state的targetKeys
  }

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }
  
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const detail_info = this.props.detailInfo
    return (
      <Form>
        <FormItem label='角色名称' {...formItemLayout} >
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label='选择用户' {...formItemLayout} >
          <Transfer 
            listStyle={{width: 200, height: 400}}
            dataSource={this.props.mockData}
            targetKeys={this.props.targetKeys}
            titles={['待选用户', '已选用户']}
            showSearch
            searchPlaceholder='输入用户名'
            filterOption={this.filterOption}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    )
  }
}

RoleAuthForm = Form.create()(RoleAuthForm)

export default Permission