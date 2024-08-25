const { readDataPengajuan } = require("../services/Pengajuan");

const tampilDashboard = async (req, res) => {
  const data = (await readDataPengajuan(req.session.user.id)) || [];
  console.log(req.session.user);
  return res.render("home", {
    layout: "layouts/main-layout",
    akun: req.session.user,
    msg: req.flash("msg"),
    data: data,
  });
};

module.exports = { tampilDashboard };
