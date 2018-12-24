import React, { Component } from 'react'
import { Card, Spin, Icon, Alert } from 'antd'
import './ui.less'

class Loading extends Component {
  render() {
    const antIcon = <Icon type="loading" />
    return (
      <div>
        <Card title="spin用法" className="card">
          <Spin size="small" />
          <Spin style={{margin: '0 10px'}} />
          <Spin size="large"/>
          <Spin indicator={antIcon} style={{margin: '0 10px'}} />
        </Card>
        <Card title="内容遮罩" className="card">
          <Alert 
            message="React"
            description="这是antd的Spin结合Alert的用法"
            type="info" 
          />
          <Spin>
            <Alert 
              message="React"
              description="这是antd的Spin结合Alert的用法"
              type="info" 
            />
          </Spin>
          <Spin tip="加载中...">
            <Alert 
              message="React"
              description="这是antd的Spin结合Alert的用法"
              type="info" 
            />
          </Spin>
          <Spin indicator={antIcon}>
            <Alert 
              message="React"
              description="这是antd的Spin结合Alert的用法"
              type="info" 
            />
          </Spin>
        </Card>
      </div>
    )
  }
}

export default Loading