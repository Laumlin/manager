import React from 'react'
import { Select } from 'antd'
const Option = Select.Option

export default {
  formatDate(time) {
    if(!time) return
    const t = new Date(time)
    return t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
  },

  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current)
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共${data.result.total_count}条`
      },
      showQuickJumper: true
    }
  },

  getOptionList(data) {
    if (!data) {
      return []
    }
    let options = []
    data.map(item => {
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options
  }
}