const mongoose = require("mongoose");

require("../../utils/db");

const kabiro = mongoose.model("kabiro", {
  kabiro: {
    type: String,
    required: true,
  },
});

module.exports = { kabiro };
