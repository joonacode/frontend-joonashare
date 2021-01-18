import Api from './apiHandler'
const END_POINT = 'post'

const postApi = {
  getAll: () => Api.get(`${END_POINT}`),
  getDetail: (id) => Api.get(`${END_POINT}/${id}`),
  getUserPost: (id) => Api.get(`${END_POINT}/post-user/${id}`),
  addComment: (data) => Api.post(`comment`, data),
  addPost: (data) => Api.post(`${END_POINT}`, data),
  updatePost: (id, data) => Api.patch(`${END_POINT}/${id}`, data),
  deleteComment: (data) => Api.patch(`comment/delete`, data),
  deletePost: (id) => Api.delete(`${END_POINT}/${id}`),
  likeAndUnlike: (data) => Api.patch('like', data),
}

export default postApi
