// 对axios的封装
import axios from 'axios'

const baseURL = 'http://localhost:5000'

// 自己创建一个axios实例
const server = axios.create({
  baseURL: baseURL
})

// 设置请求拦截器，发送每个请求会先进入到这个函数
server.interceptors.request.use((config) => {
//  发送请求之前都做了什么
  return config
}, error => {
//  对请求错误做了什么
  return Promise.reject(error)
})

// 响应拦截器，接收到的每个请求之前都会先进入这个函数
server.interceptors.respose.use(response => {
//  先对接收的响应数据做点什么
  return response
}, error => {
//  对响应错误做点什么
  return Promise.reject(error)
})

// 向外暴露出封装好的接口axios
export default {
//  POST请求
  post (url, params) {
    return server({
      method: 'post',
      url,
      data: params
    })
  },
//  GET请求
  get (url, params) {
    return server({
      method: 'get',
      url,
      params
    })
  },
  //  PUT请求
  put (url, params) {
    return server({
      method: 'put',
      url,
      data: params
    })
  },
  //  DELETE请求
  delete (url, params) {
    return server({
      method: 'delete',
      url,
      params
    })
  },
}
