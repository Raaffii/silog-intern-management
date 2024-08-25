const multer = require("multer");
const path = require("path");

// Fungsi untuk menentukan folder penyimpanan berdasarkan field name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "ktp") {
      cb(null, "public/uploads/ktp/");
    } else if (file.fieldname === "foto") {
      cb(null, "public/uploads/foto/");
    } else if (file.fieldname === "ktm") {
      cb(null, "public/uploads/ktm/");
    } else if (file.fieldname === "asuransi") {
      cb(null, "public/uploads/asuransi/");
    } else if (file.fieldname === "proposal") {
      cb(null, "public/uploads/proposal/");
    } else {
      cb(new Error("Unknown field"));
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Ekstensi file
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "ktp") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      req.fileValidationError = "Invalid file type for KTP, only PDF allowed";
      cb(null, false);
    }
  } else if (file.fieldname === "foto") {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      req.fileValidationError =
        "Invalid file type for Foto, only JPG or PNG allowed";
      cb(null, false);
    }
  } else if (file.fieldname === "proposal") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      req.fileValidationError =
        "Invalid file type for Proposal, only PDF allowed";
      cb(null, false);
    }
  } else if (file.fieldname === "asuransi") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      req.fileValidationError =
        "Invalid file type for Asuransi, only PDF allowed";
      cb(null, false);
    }
  } else if (file.fieldname === "ktm") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      req.fileValidationError = "Invalid file type for KTM, only PDF allowed";
      cb(null, false);
    }
  } else {
    req.fileValidationError = "Unknown field";
    cb(null, false);
  }
};

// Inisialisasi multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimal ukuran file 5MB
  },
});

const handleMulterError = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      req.fileSizeError = "File size is too large, maximum size allowed is 5MB";
    }
  }
  next();
};

module.exports = { upload, handleMulterError };
