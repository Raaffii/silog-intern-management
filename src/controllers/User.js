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

  if (result.succes) {
    const akun = {
      username: result.akun.username,
      email: result.akun.email,
      id: result.akun._id,
      role: result.akun.roleId,
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
