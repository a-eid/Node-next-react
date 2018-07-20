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
    return {}
  }

  componentDidMount() {
  }


  facebookResponse = (e) => {
    console.log("fb, here")
    const { dispatch } = this.props
    dispatch(authSuccess(e))
  }
  googleResponse = (e) => {
    console.log("google, here")
    const { dispatch } = this.props
    dispatch(authSuccess(e))
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
