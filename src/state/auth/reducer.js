import types from './constants'

const initialState = {
  // apiKey: '', // moved to state/base
  // apiSecret: '',
  // authToken: '',
  authStatus: null,
  isShown: true,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload,
      }
    case types.SHOW_AUTH:
      return {
        ...state,
        isShown: true,
      }
    case types.HIDE_AUTH:
      return {
        ...state,
        isShown: false,
      }
    case types.LOGOUT:
      return initialState
    default:
      return state
  }
}

export default authReducer
