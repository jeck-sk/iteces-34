// 引入axios
import axios from '@/untils/myaxios.js'
// 登录
export const login = (data) => {
  // axios（{})返回一个promise对象
  return axios({
    //   http://localhost:8888/api/private/v1/login
    //   请求路由路径
    url: 'login',
    // 设置请求方式，默认给get
    method: 'post',
    // post设置
    data
  })
}
