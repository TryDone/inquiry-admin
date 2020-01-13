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

// 获取树节点信息
export const symptomQuery = (id) => {
  return axios.request({
    url: '/api/v1/admin/symptom/query/' + id,
    async: false,
    method: 'get'
  })
}

// 获取树节点信息
export const symptomQueryAll = () => {
  return axios.request({
    url: 'api/v1/admin/symptom/queryAll',
    async: false,
    method: 'get'
  })
}

// 主键查询
export const symptomGet = (id) => {
  return axios.request({
    url: '/api/v1/admin/symptom/get/' + id,
    async: false,
    method: 'get'
  })
}

// 症状修改
export const symptomUpdate = data => {
  return axios.request({
    url: '/api/v1/admin/symptom/update',
    method: 'put',
    data: data
  })
}

// 保存关联关系
export const selectInsert = data => {
  return axios.request({
    url: '/api/v1/admin/symptom/selectInsert/',
    method: 'post',
    data: data
  })
}
