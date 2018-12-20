import React, { Component } from 'react'
import { Row, Col } from 'antd'
import utils from '../../utils/utils'
import './index.less'
import axios from 'axios'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  componentDidMount() {
    setInterval(() => {
      let sysTime = utils.formatDate(new Date())
      this.setState(() => ({sysTime}))
    }, 1000)

    axios.get('https://www.tianqiapi.com/api/?version=v1&city=%E5%B9%BF%E5%B7%9E')
      .then(res => {
        const wea = res.data.data[0].wea
        this.setState(() => ({wea}))
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span="24">
            <span>欢迎，laumlin</span>
            <a href="/">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span="3" className="breadcrumb-title">首页</Col>
          <Col span="21" className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">{this.state.wea}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header