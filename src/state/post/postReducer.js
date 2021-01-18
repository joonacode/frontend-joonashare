import {
  CLEAR_POST_STATE,
  GET_ALL_POST,
  GET_DETAIL_POST,
  GET_USER_POST,
} from '../actionTypes'

const inialState = {
  posts: [],
  detailPost: {},
  userPosts: [],
}

const postReducer = (state = inialState, action) => {
  switch (action.type) {
    case GET_ALL_POST:
      return {
        ...state,
        posts: action.payload,
      }
    case GET_DETAIL_POST:
      return {
        ...state,
        detailPost: action.payload,
      }
    case GET_USER_POST:
      return {
        ...state,
        userPosts: action.payload,
      }
    case CLEAR_POST_STATE:
      return {
        posts: [],
        detailPost: {},
        userPosts: [],
      }
    default:
      return state
  }
}

export default postReducer
