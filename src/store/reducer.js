import * as constants from './constants'

const defaultState = {
  menuName: '首页'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.NEMU_NAME:
      return {
        ...state,
        menuName: action.menuName
      }
    default:
      return state
  }
}