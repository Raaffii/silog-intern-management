const path = require("path");
const fs = require("fs");
const {
  readDataPengajuan,
  deleteDataPengajuan,
} = require("../services/Pengajuan");

const tampilDashboard = async (req, res) => {
  const data = (await readDataPengajuan(req.session.user.id)) || [];
  const dataUser= 
  console.log(req.session.user);
  return res.render("home", {
    layout: "layouts/main-layout",
    akun: req.session.user,
    msg: req.flash("msg"),
    data: data,
  });
};

const deleteDashboard = async (req, res) => {
  await deleteDataPengajuan(req.body.id);
  req.flash("msg", "Data Berhasil Terhapus");
  res.redirect("/mahasiswa/dashboard");
};

const tampilDetailDokumen = async (req, res) => {
  const { jenis, namaFile } = req.params;

  const filePath = path.join("/uploads", jenis, namaFile);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    return res.render("dokumen", {
      layout: "layouts/main-layout",
      akun: req.session.user,
      msg: req.flash("msg"),
      data: { filePath, jenis },
    });
  });
};

module.exports = { tampilDashboard, deleteDashboard, tampilDetailDokumen };
