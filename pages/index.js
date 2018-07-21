import "isomorphic-fetch"
import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Layout from "../components/Layout"
import config from "../config.json"

import { authFailure, authRequest, authSuccess } from "../redux/actions/actions"

// social auth
import FacebookLogin from "react-facebook-login"
import { GoogleLogin } from "react-google-login"

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
        // local storage
        // redux store...
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
        // local storage
        // redux store...
      })
    })
  }

  onFailure = (error) => {
    alert("something went wrong", error)
  }

  render() {
    return (
      <Fragment>
        <Layout title="Home">
          <div>home page</div>

          <div className="social-login">
            <FacebookLogin
              appId={config.FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.facebookResponse}
              style={{}}
              cssClass=""
              textButton="facebook login"
            >
              <span>facebook login</span>
            </FacebookLogin>

            <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              onSuccess={this.googleResponse}
              onFailure={this.googleResponse}
              style={{}}
            >
              <span>google login</span>
            </GoogleLogin>
          </div>
        </Layout>
        <style jsx>{``}</style>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return state
}

export default connect(mapStateToProps)(Home)
