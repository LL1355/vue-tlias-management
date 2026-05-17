import axios from 'axios'
import {ElMessage} from 'element-plus'
import router from '../router'
//创建axios实例对象
const request = axios.create({
  baseURL: '/api',
  timeout: 600000
})
//axios的请求 request 拦截器 拿到localStorage中的token
request.interceptors.request.use(
  (config) => {
    const loginUser = JSON.parse(localStorage.getItem('loginUser'))
    if(loginUser&&loginUser.token){
      config.headers.token = loginUser.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//axios的响应 response 拦截器
request.interceptors.response.use(
  (response) => { //成功回调
    return response.data
  },
  (error) => { //失败回调
    if(error.response.status === 401){
      ElMessage.error('登录信息已过期，请重新登录')
      router.push('/login')
    }
    else{
      ElMessage.error('接口访问异常')
    }
    return Promise.reject(error)
  }
)
export default request