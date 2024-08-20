const express = require('express')
const routerUser = express.Router()
const { login, signup, tampilSignup, tampilLogin } = require("../controllers/User.js")

routerUser.get("/signup", tampilSignup)
routerUser.get("/login", tampilLogin)
routerUser.post("/signup", signup)
routerUser.post("/login", login)

module.exports = routerUser