import axios from 'axios'
import { Modal } from 'antd'
import Utils from '../utils/utils'

export default class Axios {

  static requestList (_this, url, params) {
    let data = {
      params
    }

    this.ajax({
      url,
      data,
      isShowLoading: true
    }).then(res => {
      if (res.code === 0) {
        let list = res.result.item_list.map((item, index) => {
          item.key = index
          return item
        })
        _this.setState({
          dataSource: list,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current
            _this.requestList()
          })
        })
      }
    })
  }

  static ajax (options) {
    let loading 
    if (options.data && options.data.isShowLoading === true) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    let baseApi = 'https://www.easy-mock.com/mock/5c238c843671d47be5ea8d6b/api'
    /*if(options.isMock){
            //模拟接口
            baseApi = 'https://easy-mock.com/mock/5b90f09898dd927ce3890618/api';
        }else {
            //真实接口
            baseApi=''
    }*/
    return new Promise((resolve, reject) => {
      axios({
        baseURL: baseApi,
        url: options.url,
        method: 'get',
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then(res => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (res.status === 200) {
          let result = res.data
          if (result.code === 0) {
            resolve(result)
          } else {
            Modal.info({
              title: '提示',
              content: result.message
            })
          }
        } else {
          reject(res.data)
        }
      })
    })
  }
}