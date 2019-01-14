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

  render() {
    return (
      <div>
        <Card title='折线图标之一'>
          <ReactEcharts option={this.getOption()} theme='bike' style={{height: 500}} />
        </Card>
      </div>
    )
  }
}

export default Line