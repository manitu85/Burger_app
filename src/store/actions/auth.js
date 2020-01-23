import { 
  AUTH_START, 
  AUTH_SUCCESS, 
  AUTH_FAIL 
} from './actionTypes'
import axios from '../../axios-orders'

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error
  }
}


export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBg3IBhMguBC2RbAzxYUkrIurDcHtn7IvQ', authData)
    
      .then(res => {
        console.log(res)
        dispatch(authSuccess(res))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail())
      })
  }
}


