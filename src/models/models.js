const mongoose = require("mongoose");

const CountriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
});

const Country = mongoose.model("Country", CountriesSchema);

module.exports = Country;
