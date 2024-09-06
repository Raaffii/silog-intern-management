const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
//router----------------
const routerUser = require("./src/routes/User.js");
const routerMahasiswa = require("./src/routes/Mahasiswa.js");
const routerPengajuan = require("./src/routes/Pengajuan.js");
const routerAdmin = require("./src/routes/Admin.js");

//express setup
const app = express();
const port = 5000;

//setup method override
app.use(methodOverride("_method"));

//konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6 * 60 * 60 * 1000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//bulit in middleware public
app.use(express.static("public"));

//ejs as templating engine
app.set("view engine", "ejs");
app.use(expressLayouts);

app.set("views", path.resolve("./src/views"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`listening to port : ${port}`);
});

app.use("/user", routerUser);

//fungsi middlewere login dulu bro
const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    req.flash("msg", "Anda harus login untuk mengakses halaman ini.");
    return res.redirect("/user/login");
  }
};
app.use(ensureAuthenticated);

app.use("/mahasiswa", routerMahasiswa);
app.use("/admin", routerAdmin);
