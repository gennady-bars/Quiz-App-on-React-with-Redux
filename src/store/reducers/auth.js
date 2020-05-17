import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ADMIN, AUTH_NAME } from "../actions/actionTypes";

const initialState = {
  token: null,
  admin: false,
  name: 'Гость'
}

export default function authReducer(state=initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null, admin: false, name: 'Гость'
      }
    case AUTH_ADMIN:
      return {
        ...state, admin: true
      }
    case AUTH_NAME:
      return {
        ...state, name: action.name
      }
    default:
      return state;
  }
}