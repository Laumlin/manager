import * as constants from './constants'

export const setMenuName = (menuName) => ({
  type: constants.NEMU_NAME,
  menuName
})

export const setLoginStatus = (status) => ({
  type: constants.LOGIN_STATUS,
  status
})