import * as at from "../actions/types"

const initState = {
  authenticated: false,
  provider: null, 
}

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
      console.log("AUTH_SUCCESS...here")
      return {
        ...state, 
        authenticated: true,
        provider: "",
        ...action.payload.userData
      }
    default:
      console.log("default")
      return state
  }

}