import authReducer from './auth/authReducer'
import userReducer from './user/userReducer'
import postReducer from './post/postReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
})

export default rootReducer
