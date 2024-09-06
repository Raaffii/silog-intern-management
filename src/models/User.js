const mongoose = require("mongoose");

require("../../utils/db");

const user = mongoose.model("user", {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: Number,
  },
  roleId: {
    type: Number,
  },
  biro: {
    type: Number,
  },
});

module.exports = { user };
