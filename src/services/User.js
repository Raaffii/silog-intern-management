const { kabiro } = require("../models/Kabiro.js");
const { user } = require("../models/User.js");
const { tb_pengajuan } = require("../models/Pengajuan.js");
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
      status: 1,
      roleId: 1,
      biro: 0,
    };

    hashedPassword = await bcrypt.hash(dataUserBaru.password, 10);

    dataUserBaru.password = hashedPassword;

    await user.insertMany(dataUserBaru);
    return { succes: true, message: "Berhasil Terdaftar" };
  }
};

const loginCheck = async (query) => {
  let check = await user.findOne({ username: query.username });
  let isPasswordMatch;
  if (!check) {
    check = await kabiro.findOne({ kabiro: query.username });
    if (!check) {
      return { succes: false, message: "Username tidak ditemukan" };
    } else {
      isPasswordMatch = await passwordCheck(query.password, check.password);
    }
  } else {
    isPasswordMatch = await passwordCheck(query.password, check.password);
  }

  async function passwordCheck(inputPassword, realPassword) {
    const isPasswordMatch = await bcrypt.compare(inputPassword, realPassword);
    return isPasswordMatch;
  }

  if (isPasswordMatch) {
    return { succes: true, message: "Masuk", akun: check };
  } else {
    return { succes: false, message: "Password Salah" };
  }
};

const updateBiro = async (biro, id) => {
  await user.updateOne({ _id: id }, { $set: { biro: biro } });
  await tb_pengajuan.updateOne({ user: id }, { $set: { biro: biro } });
};

module.exports = { insertDataSignup, loginCheck, updateBiro };
