import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"

import {
  decrementCount,
  incrementCount,
  serverRenderClock,
  startClock,
  resetCount,
} from "./actions/actions"

import reducer from "./reducer/reducer"

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}



export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  )
}
