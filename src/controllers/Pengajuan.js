const { insertDataPengajuan, updateTambahStatus } = require("../services/Pengajuan");
const { updateBiro } = require("../services/User");
const { upload, handleMulterError } = require("../../utils/multer");

const uploadFile = upload.fields([{ name: "ktp" }, { name: "foto" }, { name: "ktm" }, { name: "proposal" }, { name: "asuransi" }]);

handleMulterErrorController = handleMulterError;

const submitPengajuan = async (req, res) => {
  if (req.fileValidationError) {
    req.flash("msg", req.fileValidationError);
    res.redirect("/mahasiswa/dashboard");
  } else if (req.fileSizeError) {
    req.flash("msg", req.fileSizeError);
    res.redirect("/mahasiswa/dashboard");
  } else {
    const dataToSave = {
      user: req.session.user.id,
      nama: req.body.nama,
      nip: req.body.nip,
      instansi: req.body.instansi,
      fakultas: req.body.fakultas,
      jurusan: req.body.jurusan,
      email: req.body.email,
      notelp: req.body.notelp,
      minat: req.body.minat,
      tanggalmulai: req.body.tanggalMulai,
      tanggalselesai: req.body.tanggalSelesai,
      ktm: req.files["ktm"][0].filename,
      asuransi: req.files["asuransi"] ? req.files["asuransi"][0].filename : null,
      ktp: req.files["ktp"][0].filename,
      foto: req.files["foto"][0].filename,
      proposal: req.files["proposal"][0].filename,
      status: 1,
      biro: "0",
    };
    const result = await insertDataPengajuan(dataToSave);
    req.flash("msg", result.message);
    res.redirect("/mahasiswa/dashboard");
  }
};

const ajukanPengajuan = (req, res) => {
  updateTambahStatus(req.body.akunid);
  req.flash("msg", "ajuan berhasil");
  res.redirect("/mahasiswa/dashboard");
};

const konfirmasiPengajuanAdmin = (req, res) => {
  updateTambahStatus(req.params.id);
  updateBiro(req.body.biro, req.params.id);
  req.flash("msg", "berhasil di ajukan");
  res.redirect("/admin/dashboard");
};

const accKabiro = async (req, res) => {
  const { akunid, akunuser } = req.body;
  updateTambahStatus(akunuser);
  res.redirect("/kabiro/dashboard");
};

module.exports = {
  submitPengajuan,
  uploadFile,
  ajukanPengajuan,
  konfirmasiPengajuanAdmin,
  accKabiro,
  handleMulterErrorController,
};
