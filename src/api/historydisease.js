import axios from '@/libs/api.request'

// 获取既往史病例
export const historyDisease = (pastHistory) => {
  return axios.request({
    url: '/api/v1/admin/user/queryPH?pastHistory=' + pastHistory,
    async: false,
    method: 'get'
  })
}
