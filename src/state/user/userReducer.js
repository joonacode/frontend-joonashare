import { CLEAR_USER_STATE, GET_ALL_USER, GET_DETAIL_USER } from '../actionTypes'

const initialState = {
  users: [],
  detailUser: {},
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
      }
    case GET_DETAIL_USER:
      return {
        ...state,
        detailUser: action.payload,
      }
    case CLEAR_USER_STATE:
      return {
        users: [],
        detailUser: {},
      }
    default:
      return state
  }
}

export default userReducer
