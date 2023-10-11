const UserModel = require("../models/User-Model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  //check for duplicate email, try to find this email in db
  const emailAlreadyInUse = await UserModel.findOne({ email });
  //   if user exists throw error, if not create new user
  if (emailAlreadyInUse) {
    throw new BadRequestError("Email already in use");
  }
  //   first registered user is an admin functionality
  //const isFirstAccount = await User.countDocuments({}) === 0;
  // const role = isFirstAccount ? 'admin' : 'user';

  //for more security on user creation: destructure and pass only
  //name, email, pw etc. without user role,which can be admin
  const user = await UserModel.create({ name, email, password, role });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("Login");
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = { register, login, logout };
