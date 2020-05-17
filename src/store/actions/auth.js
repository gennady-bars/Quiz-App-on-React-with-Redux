import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ADMIN, AUTH_NAME} from './actionTypes'

export function auth(email, password, displayName, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGcKWLirFintSSKEzMpxqdJWWW0rAj2Og'

    if (isLogin) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGcKWLirFintSSKEzMpxqdJWWW0rAj2Og';

    try {
      const response = await axios.post(url, authData)
      const data = response.data
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('displayName', data.displayName)

      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))
      dispatch(authName(data.displayName || displayName))

      if (data.localId === 'Y8ENcnke3oenv0MIYFMoIl91OUn1') {
        dispatch(authAdmin())
      }

      if (!isLogin) {
      localStorage.setItem('displayName', displayName)
        const updateConfig = {
          idToken: data.idToken,
          displayName: displayName,
          returnSecureToken: true
        }
        try {
          await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAGcKWLirFintSSKEzMpxqdJWWW0rAj2Og', updateConfig)
          
        } catch (error) {
          
        }
      }

    } catch (error) {
      console.log(error);
      if (isLogin) {
        alert('Вы не зарегистрированы на сайте. Пройдите регистрацию, пожалуйста')
      } else {
        alert('Вы уже зарегистрированы на сайте. Войдите')
      }
      
    }
  }
}

export function authName(name) {
  return {
    type: AUTH_NAME,
    name
  }
}

export function authAdmin() {
  return {
    type: AUTH_ADMIN
  }  
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        const time = (expirationDate.getTime() - new Date().getTime()) / 1000
        const userId = localStorage.getItem('userId')
        const name = localStorage.getItem('displayName')
        
        dispatch(authSuccess(token))
        dispatch(autoLogout(time))
        dispatch(authName(name))

        if (userId === 'Y8ENcnke3oenv0MIYFMoIl91OUn1') {
          dispatch(authAdmin())
        }
      }
    }
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('displayName')
  return {
    type: AUTH_LOGOUT
  }
}

export function authSuccess(token) {
  
  return {
    type: AUTH_SUCCESS,
    token
  }
}