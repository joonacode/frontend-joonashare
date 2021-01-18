import authApi from '../../apis/authApi'
import { SIGN_IN, CLEAR_AUTH_STATE, GET_ID_USER } from '../actionTypes'
import { clearPostState } from '../post/postActions'
import { clearUserState } from '../user/userActions'

export const fetchLogin = (data) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      authApi
        .login(data)
        .then((response) => {
          localStorage.setItem('token', response.data.data.token)
          dispatch({ type: SIGN_IN, payload: response.data.data })
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchRegister = (data) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      authApi
        .register(data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const getIdUser = (payload) => {
  return {
    type: GET_ID_USER,
    payload,
  }
}

export const logoutAction = () => {
  return function (dispatch) {
    dispatch({ type: CLEAR_AUTH_STATE })
    dispatch(clearPostState())
    dispatch(clearUserState())
    localStorage.clear()
  }
}
