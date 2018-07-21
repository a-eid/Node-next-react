import * as at from "../actions/types"

const initialState = { isAuthenticated: false }

export default (state = initialState, action) => {
  console.log("outside switch")
  switch (action.type) {
    case at.AUTH_REQUEST:
    case at.AUTH_FAILURE:
      return state
    case at.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload.userData,
      }
    case at.AUTH_CLEAR:
      return initialState
    default:
      return state
  }
}

