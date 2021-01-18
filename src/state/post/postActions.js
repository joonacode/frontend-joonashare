import postApi from '../../apis/postApi'
import {
  GET_ALL_POST,
  GET_DETAIL_POST,
  CLEAR_POST_STATE,
  GET_USER_POST,
} from '../actionTypes'

export const fetchAllPost = () => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .getAll()
        .then((response) => {
          dispatch({ type: GET_ALL_POST, payload: response.data.data })
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchUserPost = (id) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .getUserPost(id)
        .then((response) => {
          dispatch({ type: GET_USER_POST, payload: response.data.data })
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchDetailPost = (id) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .getDetail(id)
        .then((response) => {
          dispatch({ type: GET_DETAIL_POST, payload: response.data.data })
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchLikeOrUnlike = (data) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .likeAndUnlike(data)
        .then((response) => {
          dispatch(fetchAllPost())
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchAddComment = (data) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .addComment(data)
        .then((response) => {
          dispatch(fetchAllPost())
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchDeleteComment = (data) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .deleteComment(data)
        .then((response) => {
          dispatch(fetchAllPost())
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchAddPost = (data) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .addPost(data)
        .then((response) => {
          dispatch(fetchAllPost())
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchUpdatePost = (id, data) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .updatePost(id, data)
        .then((response) => {
          dispatch(fetchAllPost())
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const fetchDeletePost = (id) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      postApi
        .deletePost(id)
        .then((response) => {
          dispatch(fetchDetailPost(id))
          dispatch(fetchAllPost())
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  }
}

export const clearPostState = () => {
  return {
    type: CLEAR_POST_STATE,
  }
}
