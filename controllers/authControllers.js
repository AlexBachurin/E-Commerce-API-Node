const UserModel = require("../models/User-Model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const hashPassword = require("../utils/hashPassword");
const { createJWT, attachCookiesToResponse } = require("../utils/jwt");
const comparePassword = require("../utils/comparePassword");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // *** check for duplicate email, try to find this email in db ***
  const emailAlreadyInUse = await UserModel.findOne({ email });
  if (emailAlreadyInUse) {
    throw new BadRequestError("Email already in use");
  }
  //   *** first registered user is an admin functionality ***
  //const isFirstAccount = await User.countDocuments({}) === 0;
  // const role = isFirstAccount ? 'admin' : 'user';

  //*** Hash Password ***//
  const hashedPassword = await hashPassword(password);

  //for more security on user creation: destructure and pass only
  //name, email, pw etc. without user role,which can be admin
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  //   *** Create JWT TOKEN ***
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };
  //   *** Cookies ***
  // add token to cookies with response
  attachCookiesToResponse({ res, payload: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //check email and password
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  // find user
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("User does not exist");
  }
  // compare password either here or in UserModel
  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Wrong password");
  }
  //   *** Create JWT TOKEN ***
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };
  //   *** Cookies ***
  // add token to cookies with response
  attachCookiesToResponse({ res, payload: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = { register, login, logout };
