import * as constants from './constants'

const defaultState = {
  menuName: '首页',
  loginStatus: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.NEMU_NAME:
      return {
        ...state,
        menuName: action.menuName
      }
    case constants.LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.status
      }
    default:
      return state
  }
}