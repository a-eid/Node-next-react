import * as at from "./types"


// export const serverRenderClock = (isServer) => (dispatch) => {
//   return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
// }

// export const startClock = () => ({
//   type: actionTypes.TICK,
//   light: true,
//   ts: Date.now(),
// })


export const authRequest = () => ({
  type: at.AUTH_REQUEST
})

export const authFailure = (error) => ({
  type: at.AUTH_FAILURE,
  payload: { error }
})

export const authSuccess = (userData) => ({
  type: at.AUTH_SUCCESS,
  payload: { userData }
})
