import * as at from "../actions/types"

const initState = { authenticated: false, }

export default (state = initState, action) => {

  console.log("outside switch")
  switch (action.type) {
    // case actionTypes.TICK:
    //   return Object.assign({}, state, {
    //     lastUpdate: action.ts,
    //     light: !!action.light,
    //   })
    case at.AUTH_REQUEST: 
    case at.AUTH_FAILURE: 
      return state
    case at.AUTH_SUCCESS: 
      return {
        ...state, 
        authenticated: true,
        ...action.payload.userData
      }
    default:
      return state
  }

}