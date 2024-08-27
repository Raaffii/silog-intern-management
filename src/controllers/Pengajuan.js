const { insertDataPengajuan } = require("../services/Pengajuan");
const { upload, handleMulterError } = require("../../utils/multer");

const uploadFile = upload.fields([
  { name: "ktp" },
  { name: "foto" },
  { name: "ktm" },
  { name: "proposal" },
  { name: "asuransi" },
]);

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
      asuransi: req.files["asuransi"]
        ? req.files["asuransi"][0].filename
        : null,
      ktp: req.files["ktp"][0].filename,
      foto: req.files["foto"][0].filename,
      proposal: req.files["proposal"][0].filename,
    };
    const result = await insertDataPengajuan(dataToSave);
    req.flash("msg", result.message);
    res.redirect("/mahasiswa/dashboard");
  }
};

module.exports = { submitPengajuan, uploadFile, handleMulterErrorController };
