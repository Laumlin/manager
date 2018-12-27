import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
  static ajax (options) {
    let loading 
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    let baseApi = 'https://www.easy-mock.com/mock/5c238c843671d47be5ea8d6b/api'
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