const { insertDataPengajuan } = require("../services/Pengajuan");
const { upload, handleMulterError } = require("../../utils/multer");

const uploadFile = upload.fields([{ name: "ktp" }, { name: "foto" }]);

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
      nama: req.body.nama,
      nip: req.body.nip,
      ktp: req.files["ktp"][0].path,
      foto: req.files["foto"][0].path,
    };

    const result = await insertDataPengajuan(dataToSave);
    req.flash("msg", result.message);
    res.redirect("/mahasiswa/dashboard");
  }
};

module.exports = { submitPengajuan, uploadFile, handleMulterErrorController };
