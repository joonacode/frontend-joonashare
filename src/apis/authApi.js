import Api from './apiHandler'
const END_POINT = 'auth'

const authApi = {
  login: (data) => Api.post(`${END_POINT}/login`, data),
  register: (data) => Api.post(`${END_POINT}/register`, data),
}

export default authApi
