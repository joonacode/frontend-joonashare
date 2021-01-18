import { CLEAR_AUTH_STATE, SIGN_IN, GET_ID_USER } from '../actionTypes'

const initialState = {
  token: localStorage.getItem('token') || '',
  idUser: '',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.payload.token,
        idUser: action.payload.idUser,
      }
    case GET_ID_USER:
      return {
        ...state,
        idUser: action.payload,
      }
    case CLEAR_AUTH_STATE:
      return {
        token: '',
        idUser: '',
      }
    default:
      return state
  }
}

export default authReducer
