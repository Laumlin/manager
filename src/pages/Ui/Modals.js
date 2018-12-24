import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'

class Modals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
    }
  }

  handleOpen = (type) => {
    this.setState({
      [type]: true
    })
  }

  handCancel = (type) => {
    this.setState({
      [type]: false
    })
  }

  handOk = (type) => {
    this.setState({
      [type]: false
    })
  }

  render() {
    return (
      <div>
        <Card title="基础模态框" className="card card-wrap">
          <Button type="primary" onClick={() => this.handleOpen('showModal1')}>open</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹窗</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
        </Card>
        <Modal
          title="react"
          visible={this.state.showModal1}
          onCancel={() => this.handCancel('showModal1')}
          onOk={() => this.handOk('showModal1')}>
          <p>欢迎来到laumlin的后台管理系统！</p>
        </Modal>
        <Modal
          title="react"
          visible={this.state.showModal2}
          okText="好的"
          cancelText="算了"
          onCancel={() => this.handCancel('showModal2')}
          onOk={() => this.handOk('showModal2')}>
          <p>欢迎来到laumlin的后台管理系统！</p>
        </Modal>
        <Modal
          title="react"
          style={{top: 20}}
          visible={this.state.showModal3}
          onCancel={() => this.handCancel('showModal3')}
          onOk={() => this.handOk('showModal3')}>
          <p>欢迎来到laumlin的后台管理系统！</p>
        </Modal>
        <Modal
          title="react"
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4}
          onCancel={() => this.handCancel('showModal4')}
          onOk={() => this.handOk('showModal4')}>
          <p>欢迎来到laumlin的后台管理系统！</p>
        </Modal> 
      </div>
    )
  }
}

export default Modals