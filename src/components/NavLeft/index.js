import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MenuList from '../../config/menuConfig'
import './index.less'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu


class NavLeft extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    const menuTreeNode = this.renderMenu(MenuList)
    this.setState(() => {
      return {menuTreeNode}
    })
  }

  renderMenu = (MenuList) => {
    return MenuList.map((item) => {
      if(item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            { this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key}><Link to={item.key}>{item.title}</Link></Menu.Item>
    })
  }
  render() {
    return (
      <div>
        <div>
          <div className="logo">
            <img src="/assets/logo.svg" alt="" />
            <h1>Imooc MS</h1>
          </div>
          <Menu theme="dark">
            {this.state.menuTreeNode}
          </Menu>
        </div>
      </div>
    )
  }
}

export default NavLeft