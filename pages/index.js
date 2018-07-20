import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Layout from "../components/Layout"
import config from "../config.json"

import {startClock, serverRenderClock} from "../redux/actions/actions"

// social auth
// import TwitterLogin from "react-twitter-auth";
import FacebookLogin from "react-facebook-login"
import { GoogleLogin } from "react-google-login"

class Home extends Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  // state = {}

  componentDidMount() {
    const { dispatch } = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  twitterResponse = (e) => {}
  facebookResponse = (e) => {}
  googleResponse = (e) => {}
  onFailure = (error) => {
    alert(error)
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

export default connect()(Home)
