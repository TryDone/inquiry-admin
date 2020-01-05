import axios from '@/libs/api.request'

// 症状新增
export const symptomInsert = data => {
  return axios.request({
    url: '/api/v1/admin/symptom/insert',
    method: 'post',
    data: data
  })
}
// 症状删除
export const symptomDelete = (id) => {
  return axios.request({
    url: '/api/v1/admin/symptom/delete',
    params: {
      id
    },
    method: 'delete'
  })
}

export const symptomQuery = (id) => {
  return axios.request({
    url: '/api/v1/admin/symptom/query/' + id,
    method: 'get'
  })
}
