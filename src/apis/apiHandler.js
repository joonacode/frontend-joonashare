import axios from 'axios'
import store from '../state/store'
import { history } from '../App'
import { showToast } from '../utils/toast'
import { logoutAction } from '../state/auth/authActions'
const { dispatch } = store

const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
})

Api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

Api.interceptors.response.use(
  function (response) {
    return response
  },
  function (err) {
    const { message, status_code } = err.response.data
    if (message === 'Token invalid' && status_code === 401) {
      dispatch(logoutAction())
      showToast('error', 'Token Invalid')
      history.push('/auth/signin')
    } else if (message === 'Token expired' && status_code === 401) {
      dispatch(logoutAction())
      showToast('error', 'Your session is expired, please login again')
      history.push('/auth/signin')
    }
    return Promise.reject(err)
  },
)

export default Api
