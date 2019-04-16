import axios from 'axios'

const URL = 'http://localhost:8080/'

const apiClient = axios.create({
  baseURL: URL
})

apiClient.interceptors.response.use(response =>
  response, (error) => {
  if (error.response.status === 401 && !window.location.href.includes('login')) {
    document.location.href = '/login'
  }
  return Promise.reject(error)
})

let Token = null

export default {
  imageUrl: `${URL}upload-dir/`,
  auth: {
    userLogin (payload) {
      return apiClient.post('oauth/token',
        payload,
        {
          auth: {
            username: 'admin-client',
            password: 'admin-secret'
          }
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          }
        }
      )
    },
    tokenStore (token) {
      Token = token
    },
    logout () {
      return apiClient.get(`admin/logouts?access_token=${Token}`)
    }
  },
  data: {
    getData (page, size) {
      return apiClient.get(`admin/posts?page=${page}&size=${size}`, { headers: { Authorization: 'Bearer ' + Token } })
    },
    getLimitedData (page, size) {
      return apiClient.get(`news?page=${page}&size=${size}`)
    },
    postData (payload) {
      return apiClient.post('admin/post', payload, { headers: {
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data'
      } })
    },
    updateData (id, payload) {
      return apiClient.put(`admin/post/${id}`, payload, { headers: {
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data'
      } })
    },
    getUsername () {
      return apiClient.get('getUsername', { headers: { Authorization: 'Bearer ' + Token } })
    },
    deleteData (id) {
      return apiClient.delete(`admin/post/${id}`, { headers: { Authorization: 'Bearer ' + Token } })
    }
  }
}
