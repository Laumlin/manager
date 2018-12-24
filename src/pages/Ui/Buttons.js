import React, { Component } from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import './ui.less'

class Buttons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      size: 'default'
    }
  }

  handleCloseLoading = () => {
    this.setState({
      loading: false
    })
  }

  handleRadioChange = (e) => {
    const size = e.target.value
    this.setState({
      size: size
    })
  }

  render() {
    const { loading, size } = this.state
    return (
      <div>
        <Card title="基础按钮" className="card card-wrap">
          <Button type="primary">laumlin</Button>
          <Button>laumlin</Button>
          <Button type="dashed">laumlin</Button>
          <Button type="danger">laumlin</Button>
          <Button disabled>laumlin</Button>
        </Card>
        <Card title="图形按钮" className="card card-wrap">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button icon="search" shape="circle"></Button>
          <Button icon="search" type="primary">搜索</Button>
          <Button icon="download" type="primary">下载</Button>
        </Card>
        <Card title="loading按钮" className="card card-wrap">
          <Button type="primary" loading={loading}>确定</Button>
          <Button type="primary" loading={loading} shape="circle"></Button>
          <Button loading={loading}>点击加载</Button>
          <Button loading={loading} shape="circle"></Button>
          <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
        </Card>
        <Card title="按钮组" className="card">
          <Button.Group>
            <Button type="primary"><Icon type="left" />返回</Button>
            <Button type="primary">前进<Icon type="right" /></Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸" className="card card-wrap">
          <Radio.Group onChange={this.handleRadioChange} value={size}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={size}>laumlin</Button>
          <Button size={size}>laumlin</Button>
          <Button type="dashed" size={size}>laumlin</Button>
          <Button type="danger" size={size}>laumlin</Button>
        </Card>
      </div>
    )
  }
}

export default Buttons