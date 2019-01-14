import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import echartTheme from '../echartTheme'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

class Line extends Component {

  componentWillMount() {
    echarts.registerTheme('bike', echartTheme);
  }

  getOption = () => {
    let option = {
      title: { 
        text: '用户骑行订单'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [ 1000, 2000, 1500, 3000, 2000, 1200, 800 ]
        }
      ]
    }
    return option
  }

  getOption2 = () => {
    let option = {
      title: { 
        text: '用户骑行订单'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['ofo订单量', '摩拜订单量']
      },
      series: [
        {
          name: 'ofo订单量',
          type: 'line',
          data: [ 2000, 3000, 5500, 7000, 8000, 12000, 20000 ]
        },
        {
          name: '摩拜订单量',
          type: 'line',
          data: [ 1500, 3000, 4500, 6000, 8000, 10000, 15000 ] 
        },
      ]
    }
    return option
  }

  getOption3 = () => {
    let option = {
      title: { 
        text: '用户骑行订单'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [ 1000, 2000, 1500, 3000, 2000, 1200, 800 ],
          areaStyle: {}
        }
      ]
    }
    return option
  }

  render() {
    return (
      <div>
        <Card title='折线图标之一'>
          <ReactEcharts option={this.getOption()} theme='bike' style={{height: 500}} />
        </Card>
        <Card title='折线图标之二' style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme='bike' style={{height: 500}} />
        </Card>
        <Card title='折线图标之三' style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption3()} theme='bike' style={{height: 500}} />
        </Card>
      </div>
    )
  }
}

export default Line