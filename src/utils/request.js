/**
 * 封装axios请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://124.220.192.79:10011',
  timeout: 5000
})

export default request
