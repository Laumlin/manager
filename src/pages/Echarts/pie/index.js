import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import echartTheme from '../echartTheme'
// 引入饼图和折线图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

class Pie extends Component {

  componentWillMount() {
    echarts.registerTheme('bike', echartTheme);
  }

  getOption = () => {
    let option = {
      title: { 
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br />{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [ 
            {
              value: 1000,
              name: '周一'
            }, 
            {
              value: 2000,
              name: '周二'
            },
            {
              value: 1500,
              name: '周三'
            },
            {
              value: 3000,
              name: '周四'
            },
            {
              value: 2000,
              name: '周五'
            },
            {
              value: 1200,
              name: '周六'
            },
            {
              value: 800,
              name: '周日'
            }
          ]
        }
      ]
    }
    return option
  }

  getOption2 = () => {
    let option = {
      title: { 
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br />{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'],
          data: [ 
            {
              value: 1000,
              name: '周一'
            }, 
            {
              value: 2000,
              name: '周二'
            },
            {
              value: 1500,
              name: '周三'
            },
            {
              value: 3000,
              name: '周四'
            },
            {
              value: 2000,
              name: '周五'
            },
            {
              value: 1200,
              name: '周六'
            },
            {
              value: 800,
              name: '周日'
            }
          ]
        }
      ]
    }
    return option
  }

  render() {
    return (
      <div>
        <Card title='饼图标之一'>
          <ReactEcharts option={this.getOption()} theme='bike' style={{height: 500}} />
        </Card>
        <Card title='饼图标之二' style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme='bike' style={{height: 500}} />
        </Card>
      </div>
    )
  }
}

export default Pie