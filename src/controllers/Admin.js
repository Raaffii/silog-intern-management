const {
  readDataPengajuan,
  kelompokanPengajuan,
} = require("../services/Pengajuan");

const tampilDashboard = async (req, res) => {
  const data = (await readDataPengajuan(2)) || [];
  const data2 = (await kelompokanPengajuan(data)) || [];
  // Kirimkan hasil
  return res.render("homeAdmin", {
    layout: "layouts/main-layout",
    akun: req.session.user,
    msg: req.flash("msg"),
    data: data2,
  });
};

module.exports = { tampilDashboard };
