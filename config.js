const config = require("./config.json")
module.exports = {
  facebookAuth: {
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: "8f01f50047778b92143b62b771d66a00",
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
    profileURL:
      "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email"
  },

  googleAuth: {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: "H_9Rxe4dnlcGoceuuiK2yOao",
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  }
};


