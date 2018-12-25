import React, { Component } from 'react'
import { Card, Col, Row } from 'antd'

class Gallery extends Component {
  constructor(props) {
    super(props) 
    const imgArray = [
      ['p1.jpg', 'p2.jpg', 'p3.jpg', 'p4.jpg', 'p5.jpg'],
      ['p6.jpg', 'p7.jpg', 'p8.jpg', 'p9.jpg', 'p10.jpg'],
      ['p5.jpg', 'p4.jpg', 'p3.jpg', 'p2.jpg', 'p1.jpg'],
      ['p10.jpg', 'p9.jpg', 'p8.jpg', 'p7.jpg', 'p6.jpg']
    ]

    this.imgList = imgArray.map(list => list.map(item => 
      <Card 
        style={{marginBottom: 16}}
        cover={<img src={'/gallery/'+item} alt={item} />}
        key={item}
        >
        <Card.Meta 
          title='周二珂'
          description='外号：周二猴'
        />
      </Card>
    ))
  }

  render() {
    return (
      <div>
        <Row 
          gutter={16}>
          <Col md={6}>{this.imgList[0]}</Col>
          <Col md={6}>{this.imgList[1]}</Col>
          <Col md={6}>{this.imgList[2]}</Col>
          <Col md={6}>{this.imgList[3]}</Col>
        </Row>
      </div>
    )
  }
}

export default Gallery