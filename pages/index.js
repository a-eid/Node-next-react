import React, { Component, Fragment } from "react";
import Layout from "../components/Layout";
import config from "../config.json"

// social auth
// import TwitterLogin from "react-twitter-auth";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

class Home extends Component {
  state = {};
  twitterResponse = e => {};
  facebookResponse = e => {};
  googleResponse = e => {};
  onFailure = error => {
    alert(error);
  };

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
    );
  }
}

export default Home;
