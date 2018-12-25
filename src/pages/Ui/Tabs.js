import React, { Component } from 'react' 
import { Card, Icon, Tabs, message } from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane

class Tab extends Component {
  constructor(props) {
    super(props)
    const panes = [   
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3' }
    ]
    this.newTabIndex = 0
    this.state = { 
      panes,
      activeKey: '1' 
    }   
  }

  handleChange = (activeKey) => {
    message.info(`Hi, 你选择了${activeKey}号页签`)
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  add = () => {
    const panes = this.state.panes
    const activeKey = `newTab${this.newTabIndex++}`
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey })
    this.setState({ panes, activeKey })
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey)
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key
    }
    this.setState({ panes, activeKey })
  }

  render() {
    return (
      <div>
        <Card title='Tabs页签' className='card'>
          <Tabs defaultActiveKey='1' onChange={this.handleChange}>
            <TabPane tab='Tab 1' key='1'>Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key='2' disabled>Content of Tab Pane 2</TabPane>
            <TabPane tab='Tab 3' key='3'>Content of Tab Pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title='带图标的Tabs页签' className='card'>
          <Tabs defaultActiveKey='1' onChange={this.handleChange}>
            <TabPane tab={<span><Icon type='plus' />Tab 1</span>} key='1'>Content of Tab Pane 1</TabPane>
            <TabPane tab={<span><Icon type='edit' />Tab 2</span>} key='2'>Content of Tab Pane 2</TabPane>
            <TabPane tab={<span><Icon type='delete' />Tab 3</span>} key='3'>Content of Tab Pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title='新增和删除页签' className='card'>
          <Tabs 
            onChange={this.handleChange}
            activeKey={this.state.activeKey}
            type='editable-card'
            onEdit={this.onEdit}>
            {
              this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default Tab