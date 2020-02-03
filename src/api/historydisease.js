import axios from '@/libs/api.request'

// 获取既往史
export const historyDisease = data => {
  return axios.request({
    url: '/api/v1/admin/user/history',
    async: false,
    method: 'post',
    data: data
  })
}

// 获取家族史
export const historyJZ = data => {
  return axios.request({
    url: '/api/v1/admin/user/queryPH',
    async: false,
    method: 'post',
    data: data
  })
}
