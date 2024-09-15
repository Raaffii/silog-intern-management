const { insertDataSignup, loginCheck } = require("../services/User");

const tampilSignup = (req, res) => {
  return res.render("signup", {
    layout: "layouts/auth-layout",
  });
};

const signup = async (req, res) => {
  const result = await insertDataSignup(req.body);

  if (result.succes) {
    res.send(result.message);
  } else {
    res.send(result.message);
  }
};

const tampilLogin = (req, res) => {
  return res.render("login", {
    layout: "layouts/auth-layout",
    msg: req.flash("msg"),
    username: req.flash("isiUsername"),
  });
};

const login = async (req, res) => {
  const result = await loginCheck(req.body);
  console.log(result.akun);
  if (result.succes) {
    const akun = {
      username: result.akun.username ? result.akun.username : result.akun.kabiro,
      email: result.akun.email ? result.akun.email : "biro@gmail.com",
      id: result.akun._id ? result.akun._id.toString() : "7", // Menggunakan _id dan mengubahnya menjadi string jika perlu
      role: result.akun.roleId ? result.akun.roleId : "20",
    };
    req.session.user = akun;
    if (result.akun.roleId == 1) {
      res.redirect("/mahasiswa/dashboard");
    } else {
      res.redirect("/admin/dashboard");
    }
  } else {
    req.flash("msg", result.message);
    req.flash("isiUsername", req.body.username);
    res.redirect("/user/login");
  }
};

module.exports = { tampilSignup, signup, tampilLogin, login };
