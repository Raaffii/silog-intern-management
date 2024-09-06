const { kabiro } = require("../models/Kabiro.js");

const tambahKabiro = async (data) => {
  await kabiro.insertMany(data);
};

const readDataKabiro = async () => {
  data = await kabiro.find();
  return data;
};

module.exports = {
  tambahKabiro,
  readDataKabiro,
};
