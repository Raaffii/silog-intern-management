const {
  readDataPengajuan,
  kelompokanPengajuan,
  readDataDetail,
} = require("../services/Pengajuan");

const { tambahKabiro, readDataKabiro } = require("../services/Kabiro");

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

const viewDashboard = async (req, res) => {
  const data = await readDataPengajuan(req.params.id);

  return res.render("home", {
    layout: "layouts/main-layout",
    akun: req.session.user,
    msg: req.flash("msg"),
    data: data,
  });
};

const tampilEdit = async (req, res) => {
  const data = await readDataPengajuan(req.params.id);
  const dataKabiro = await readDataKabiro();
  return res.render("adminEdit", {
    layout: "layouts/main-layout",
    akun: req.session.user,
    msg: req.flash("msg"),
    data: data,
    kabiro: dataKabiro,
  });
};

const tambahDataKabiro = async (req, res) => {
  await tambahKabiro(req.body);
  res.redirect("/admin/edit");
};

module.exports = {
  tampilDashboard,
  viewDashboard,
  tampilEdit,
  tambahDataKabiro,
};
