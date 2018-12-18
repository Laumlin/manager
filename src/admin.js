import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'
import { Row, Col } from 'antd';

class Admin extends Component {
  render() {
    return (
      <Row className="container">
        <Col span={3} className="nav-left">
          <NavLeft></NavLeft>
        </Col>
        <Col span={21} className="main">
          <Header></Header>
          <Row className="content">
            content
          </Row>
          <Footer></Footer>
        </Col>
      </Row>
    )
  }
}

export default Admin