import userApi from '../../apis/userApi'
import { CLEAR_USER_STATE, GET_ALL_USER, GET_DETAIL_USER } from '../actionTypes'

export const fetchAllUser = () => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      userApi
        .getAll()
        .then((response) => {
          dispatch({ type: GET_ALL_USER, payload: response.data.data })
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchDetailUser = () => {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      userApi
        .getDetail(getState().auth.idUser)
        .then((response) => {
          dispatch({ type: GET_DETAIL_USER, payload: response.data.data })
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const clearUserState = () => {
  return {
    type: CLEAR_USER_STATE,
  }
}
