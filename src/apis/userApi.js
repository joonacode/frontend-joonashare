import Api from './apiHandler'
const END_POINT = 'user'

const userApi = {
  getAll: () => Api.get(`${END_POINT}`),
  getDetail: (id) => Api.get(`${END_POINT}/${id}`),
}

export default userApi
