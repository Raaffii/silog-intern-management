
const { insertDataSignup, loginCheck } = require("../services/User")



const tampilSignup = (req, res) => {
    return res.render("signup", {
        layout: 'layouts/auth-layout'
    })
}

const signup = async (req, res) => {
    result = await insertDataSignup(req.body)

    if (result.succes) {
        res.send(result.message)
    } else {
        res.send(result.message)
    }
}

const tampilLogin = (req, res) => {
    return res.render("login", {
        layout: 'layouts/auth-layout'
    })
}

const login = async (req, res) => {
    result = await loginCheck(req.body)

    if (result.succes) {
        res.send(result.message)
    } else {
        res.send(result.message)
    }
}



module.exports = { tampilSignup, signup, tampilLogin, login }

