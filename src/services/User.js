const { user } = require("../models/User.js");
const bcrypt = require("bcrypt");

const insertDataSignup = async (query) => {
  const existingUser = await user.findOne({
    $or: [{ username: query.username }, { email: query.email }],
  });
  console.log(existingUser);
  if (existingUser) {
    return { succes: false, message: "Nama/Email Sudah Terdaftar" };
  } else {
    const dataUserBaru = {
      username: query.username,
      password: query.password,
      email: query.email,
    };

    hashedPassword = await bcrypt.hash(dataUserBaru.password, 10);

    dataUserBaru.password = hashedPassword;

    await user.insertMany(dataUserBaru);
    return { succes: true, message: "Berhasil Terdaftar" };
  }
};

const loginCheck = async (query) => {
  const check = await user.findOne({ username: query.username });
  if (!check) {
    return { succes: false, message: "Username tidak ditemukan" };
  } else {
    const isPasswordMatch = await bcrypt.compare(
      query.password,
      check.password
    );

    if (isPasswordMatch) {
      return { succes: true, message: "Masuk", akun: check };
    } else {
      return { succes: false, message: "Password Salah" };
    }
  }
};

module.exports = { insertDataSignup, loginCheck };
