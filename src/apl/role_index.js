// 引入axios
import axios from '@/untils/myaxios.js'
// 登录
// 获取所有用户数据
export const getroleslist = () => {
  return axios({
    url: 'roles'
  })
}
