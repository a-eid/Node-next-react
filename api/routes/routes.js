const express = require("express")
const router = express.Router()
const {
  generateToken,
  sendToken,
  verifyToken,
} = require("../../utils/token.utils")
const passport = require("passport")

const config = require("../../config")
const request = require("request")

require("../../passport")()

router.route("/auth/facebook").post(
  passport.authenticate("facebook-token", { session: false }),
  function(req, res, next) {
    console.log("/auth/facebook")
    if (!req.user) {
      return res.send(401, "User Not Authenticated")
    }
    req.auth = {
      id: req.user.id,
    }
    next()
  },
  generateToken,
  sendToken,
)

router.route("/auth/google").post(
  passport.authenticate("google-token", { session: false }),
  function(req, res, next) {
    console.log("/auth/google")
    if (!req.user) {
      return res.send(401, "User Not Authenticated")
    }
    req.auth = {
      id: req.user.id,
    }
    next()
  },
  generateToken,
  sendToken,
)

router.post("/auth/validateToken", (req, res) => {
  const { access_token } = req.body
  const valid = verifyToken(access_token)
  res.json({ valid })
})

module.exports = router
