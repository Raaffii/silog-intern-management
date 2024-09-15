const { kabiro } = require("../models/Kabiro.js");
const bcrypt = require("bcrypt");

const tambahKabiro = async (data) => {
  const existingKabiro = await kabiro.findOne({
    kabiro: data.kabiro,
  });
  console.log(existingKabiro);
  if (existingKabiro) {
    return { succes: false, message: "Nama Sudah Terdaftar" };
  } else {
    dataKabiro = {
      kabiro: data.kabiro,
      password: data.password,
    };

    const hashedPassword = await bcrypt.hash(data.password, 10);
    dataKabiro.password = hashedPassword;

    await kabiro.insertMany(dataKabiro);
  }
};

const readDataKabiro = async () => {
  data = await kabiro.find();
  return data;
};

module.exports = {
  tambahKabiro,
  readDataKabiro,
};
