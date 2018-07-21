import React from "react"
import config from "../config.json"


import FacebookLogin from "react-facebook-login"
import { GoogleLogin } from "react-google-login"



const SocialLogin = ({facebookResponse,googleResponse, onFailure, onClick }) => (
  <div className="social-login">
    <FacebookLogin
      appId={config.FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={facebookResponse}
      style={{}}
      cssClass=""
      textButton="facebook login"
      onClick={onClick}
    >
      <span>facebook login</span>
    </FacebookLogin>

    <GoogleLogin
      clientId={config.GOOGLE_CLIENT_ID}
      onSuccess={googleResponse}
      onFailure={onFailure}
      style={{}}
      onRequest={onClick}
    >
      <span>google login</span>
    </GoogleLogin>
  </div>
)


export default SocialLogin