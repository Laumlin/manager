import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Row, Col } from 'antd';

class Admin extends Component {
  render() {
    return (
      <Row>
        <Col span={3}>left</Col>
        <Col span={21}>
          <Header></Header>
          <Row>
            content
          </Row>
          <Footer></Footer>
        </Col>
      </Row>
    )
  }
}

export default Admin