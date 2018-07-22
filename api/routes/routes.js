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


router.post("/list", (req, res) => {
  res.json([
    {name: "something 1"},
    {name: "something 2"},
    {name: "something 3"},
    {name: "something 4"},
    {name: "something 5"},
    {name: "something 6"},
    {name: "something 7"},
  ])
})

router.post("/list/create", (req, res) => {
  const { name } = req.body
  res.json({name})
})

router.post("/list/:id", (req, res) => {
  res.json([
    {name: "url name 1", url: "http://google.com"},
    {name: "url name 2", url: "http://google.com"},
    {name: "url name 3", url: "http://google.com"},
    {name: "url name 4", url: "http://google.com"},
    {name: "url name 5", url: "http://google.com"},
    {name: "url name 6", url: "http://google.com"},
    {name: "url name 7", url: "http://google.com"},
    {name: "url name 8", url: "http://google.com"},
  ])
})

module.exports = router
