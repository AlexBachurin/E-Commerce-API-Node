const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    // use regex for validation or package
    // regex for checking email
    // match: [
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   "Please provide valid email",
    // ],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    //unique index, if email in use we get duplicate message
    //unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    maxlength: 50,
  },
  //role user or admin
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
