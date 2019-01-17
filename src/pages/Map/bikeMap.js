import React, { Component } from 'react'
import axios from '../../axios'
import { Card } from 'antd'
import BaseForm from '../../components/BaseForm'

class BikeMap extends Component {

  state = {}

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      placeholder: '全部',
      initialValue: '0',
      list: [{id: '0', name: '全部'}, {id: '1', name: '北京市'}, {id: '2', name: '深圳市'}, {id: '3', name: '上海市'},],
      width: 100
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '0',
      list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '2', name: '进行中(临时停车)'}, {id: '3', name: '已结束'},],
      width: 140
    }
  ]

  // 查询表单
  handleFilter = (params) => {
    this.params = params
    this.requestList()
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          total_count: res.result.total_count
        })
        this.renderMap(res)
      }
    })
  }

  // 渲染地图
  renderMap = (res) => {
    this.map = new window.BMap.Map('container')
    // 绘制起始点、终点
    this.renderStartEnd(res)
    // 绘制起始、终点连线
    this.renderStartToEnd(res)
    // 绘制服务区
    this.renderServiceArea(res)
    // 绘制单车分布
    this.renderBikes(res)
    // 添加地图控件
    this.addMapControl()
  }

  // 绘制起始点、终点
  renderStartEnd = (res) => {
    let list = res.result.route_list
    let gps1 = list[0].split(',')
    let startPoint = new window.BMap.Point(gps1[0], gps1[1])
    let gps2 = list[list.length-1].split(',')
    let endPoint = new window.BMap.Point(gps2[0], gps2[1])
    // 绘制中心点
    this.map.centerAndZoom(endPoint, 11)

    // 起点
    let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon })
    this.map.addOverlay(startMarker)

    // 终点
    let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon})
    this.map.addOverlay(endMarker)
  }

  // 绘制起始、终点连线
  renderStartToEnd = (res) => {
    let list = res.result.route_list
    let routeList = []
    list.forEach(item => {
      let p = item.split(',')
      routeList.push(new window.BMap.Point(p[0], p[1]))
    })

    let polyline = new window.BMap.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    })
    this.map.addOverlay(polyline)
  }

  // 绘制服务区
  renderServiceArea = (res) => {
    let serviceList = res.result.service_list
    let trackPoint = []
    serviceList.forEach(item => {
      trackPoint.push(new window.BMap.Point(item.lon, item.lat))
    })

    let polyline = new window.BMap.Polyline(trackPoint, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    })
    this.map.addOverlay(polyline)
  }

  // 绘制单车分布
  renderBikes = (res) => {
    let bikeList = res.result.bike_list
    bikeList.forEach(item => {
      let p = item.split(',')
      let point = new window.BMap.Point(p[0], p[1])
      let icon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36,42),
        anchor: new window.BMap.Size(18, 42)
      })

      let mark = new window.BMap.Marker(point, { icon })
      this.map.addOverlay(mark)
    })
  }

  // 添加地图控件
  addMapControl = ()=>{
    let map = this.map;
    map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
    map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
  } 

  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <div style={{marginBottom: 10}}>共有{this.state.total_count}辆车</div>
          <div id='container' style={{height: 500}}></div>
        </Card>
      </div>
    )
  }
}

export default BikeMap