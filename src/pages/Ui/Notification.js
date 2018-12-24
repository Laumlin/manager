import React, { Component } from 'react'
import { Card, Button, notification } from 'antd'
import './ui.less'

class Notification extends Component {
  openNotification = (type, direction) => {
    if (direction) {
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: 'Merry Christmas',
      description: '明天是圣诞节，今天晚上是平安夜'
    })
  }

  render() {
    return (
      <div>
        <Card title='通知提醒框' className="card card-wrap">
          <Button type='primary' onClick={() => this.openNotification('success')}>Success</Button>
          <Button type='info' onClick={() => this.openNotification('info')}>Info</Button>
          <Button type='warning' onClick={() => this.openNotification('warning')}>Warning</Button>
          <Button type='error' onClick={() => this.openNotification('error')}>Error</Button>
        </Card>
        <Card title='通知提醒框' className="card card-wrap">
          <Button type='primary' onClick={() => this.openNotification('success', 'topLeft')}>Success</Button>
          <Button type='info' onClick={() => this.openNotification('info', 'topRight')}>Info</Button>
          <Button type='warning' onClick={() => this.openNotification('warning', 'bottomLeft')}>Warning</Button>
          <Button type='error' onClick={() => this.openNotification('error', 'bottomRight')}>Error</Button>
        </Card>
      </div>
    )
  }
}

export default Notification