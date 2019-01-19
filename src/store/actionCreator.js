import * as constants from './constants'

export const setMenuName = (menuName) => ({
  type: constants.NEMU_NAME,
  menuName
})