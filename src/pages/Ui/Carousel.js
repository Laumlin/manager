import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'

class Carousels extends Component {
  render() {
    return (
      <div>
        <Card title='文字背景轮播' className='card'>
          <Carousel autoplay>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
          </Carousel>
        </Card>
        <Card title='图片背景轮播' className='card carousel-wrap'>
          <Carousel autoplay>
            <div><img src='/carousel/1.jpg' alt='' /></div>
            <div><img src='/carousel/2.jpg' alt='' /></div>
            <div><img src='/carousel/3.jpg' alt='' /></div>
          </Carousel>
        </Card>
      </div>
    )
  }
}

export default Carousels