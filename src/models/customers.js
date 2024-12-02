const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: String,
  reality: String,
});

module.exports = mongoose.model("Customer", customerSchema);
