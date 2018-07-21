import React from "react"
import config from "../config.json"

import FacebookLogin from "react-facebook-login"
import { GoogleLogin } from "react-google-login"


const SocialLogin = ({facebookResponse,googleResponse, onFailure }) => (
  <div className="social-login">
    <FacebookLogin
      appId={config.FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={facebookResponse}
      style={{}}
      cssClass=""
      textButton="facebook login"
    >
      <span>facebook login</span>
    </FacebookLogin>

    <GoogleLogin
      clientId={config.GOOGLE_CLIENT_ID}
      onSuccess={googleResponse}
      onFailure={onFailure}
      style={{}}
    >
      <span>google login</span>
    </GoogleLogin>
  </div>
)


export default SocialLogin