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

  // <select>选项列表
  getOptionList(data) {
    if (!data) {
      return []
    }
    let options = []
    data.map(item => 
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    )
    return options
  },

  /*
    * ETable 行点击通用函数
    * @param {*选中行的索引} selectedRowKeys
    * @param {*选中行对象} selectedItem
    */
  updateSelectedItem(selectedRowKeys, selectedRows, seletedIds) {
    if (seletedIds) {
      this.setState({
        selectedRowKeys,
        seletedIds: seletedIds,
        selectedItem: selectedRows
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      })
    }
  }
}