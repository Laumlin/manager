import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import './ui.less'

class Messages extends Component {
  openMessage = (type) => {
    message[type]("明天是圣诞节！")
  }

  render() {
    return (
      <div>
        <Card title='全局提示' className='card-wrap'>
          <Button type='primary' onClick={() => this.openMessage('success')}>Success</Button>
          <Button type='info' onClick={() => this.openMessage('info')}>Info</Button>
          <Button type='warning' onClick={() => this.openMessage('warning')}>Warning</Button>
          <Button type='error' onClick={() => this.openMessage('error')}>Error</Button>
          <Button type='loading' onClick={() => this.openMessage('loading')}>Loading</Button>
        </Card>
      </div>
    )
  }
}

export default Messages