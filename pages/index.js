import "isomorphic-fetch"
import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Layout from "../components/Layout"
import SocialLogin from "../components/SocialLogin"
import UserState from "../components/UserState"
import NProgress from "nprogress"

import { authFailure, authRequest, authSuccess } from "../redux/actions/actions"

// social auth
class Home extends Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req
    return { isServer }
  }

  componentDidMount() {}

  facebookResponse = (e) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: e.accessToken }, null, 2)],
      { type: "application/json" },
    )
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    }

    fetch("http://localhost:3000/api/auth/facebook", options).then((r) => {
      const token = r.headers.get("x-auth-token")
      r.json().then((user) => {
        console.log("token", token, "user", user)
        const provider = "facebook"
        const AUTH = {
          token,
          user,
          provider,
        }
        localStorage.setItem("AUTH", JSON.stringify(AUTH))
        this.props.dispatch(authSuccess(AUTH))
        NProgress.done()
      })
    })
  }

  googleResponse = (e) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: e.accessToken }, null, 2)],
      { type: "application/json" },
    )
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    }
    fetch("http://localhost:3000/api/auth/google", options).then((r) => {
      const token = r.headers.get("x-auth-token")
      r.json().then((user) => {
        console.log("token", token, "user", user)

        const provider = "google"
        const AUTH = {
          token,
          user,
          provider,
        }
        localStorage.setItem("AUTH", JSON.stringify(AUTH))
        this.props.dispatch(authSuccess(AUTH))
        NProgress.done()
      })
    })
  }

  startLoader = () => {
    NProgress.start()
  }

  onFailure = (error) => {
    alert("something went wrong", error)
    NProgress.done()
  }

  render() {
    const { auth = {} } = this.props
    return (
      <Fragment>
        <Layout title="Home">
          <div>home page</div>
          {!auth.isAuthenticated ? (
            <SocialLogin
              facebookResponse={this.facebookResponse}
              googleResponse={this.googleResponse}
              onFailure={this.onFailure}
              onClick={this.startLoader}
            />
          ) : (
            <UserState />
          )}
        </Layout>
        <style jsx>{``}</style>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Home)
