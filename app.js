const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const bcrypt = require("bcrypt")
const session = require("express-session")
//const cookieParser = require("cookie-parser")
const flash = require('connect-flash')

//router----------------

const routerUser = require("./src/routes/User.js");

//express setup
const app = express()
const port = 5000


//konfigurasi flash

app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)
app.use(flash())


//bulit in middleware public
app.use(express.static('public'))

//ejs as templating engine
app.set("view engine", "ejs")
app.use(expressLayouts)

app.set("views", path.resolve("./src/views"))
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`listening to port : ${port}`)
})

app.use("/user", routerUser)


