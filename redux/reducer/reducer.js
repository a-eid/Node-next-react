import { combineReducers } from "redux"
import auth from "./auth"

import * as actionTypes from "../actions/types"

// export default (state = exampleInitialState, action) => {
//   switch (action.type) {
//     case actionTypes.TICK:
//       return Object.assign({}, state, {
//         lastUpdate: action.ts,
//         light: !!action.light,
//       })
//     default:
//       return state
//   }
// }

export default combineReducers({
  auth,
})
