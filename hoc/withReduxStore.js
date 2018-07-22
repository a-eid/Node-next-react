import React from "react"
import { initializeStore } from "../redux/store"
import NProgress from "nprogress"
import { authSuccess } from "../redux/actions/actions"
import Loading from "../components/Loading"

const isServer = typeof window === "undefined"
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__"

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }
  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

const withReduxStore = (App) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps.call(App, appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      }
    }

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
      this.state = {
        loading: true
      }
    }


    done = () => {
      this.setState(
        {
          loading: false,
        },
        () => {
          NProgress.done()
        },
      )
    }


    componentDidMount() {
      NProgress.start()
      const { isAuthenticated } = this.props
      if (isAuthenticated) {
        this.done()
      }

      const auth = JSON.parse(localStorage.getItem("AUTH")) || {}
      const { token } = auth
      if (!token) {
        this.done()
        return
      }

      const body = new Blob(
        [JSON.stringify({ access_token: token }, null, 2)],
        {
          type: "application/json",
        },
      )

      fetch("/api/auth/validateToken", {
        method: "POST",
        body,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("here")
          if (res.valid) {
            this.reduxStore.dispatch(authSuccess(auth))
            console.log("valid")
          } else {
            console.log("not valid")
          }
          this.done()
        })
    }


    render() {
      const { loading } = this.state
      if(loading) return <Loading />
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}

export default withReduxStore
