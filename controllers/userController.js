const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const UserModel = require("../models/User-Model");
const { StatusCodes } = require("http-status-codes");
const comparePassword = require("../utils/comparePassword");
const hashPassword = require("../utils/hashPassword");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookiesToResponse } = require("../utils/jwt");
const checkPermissions = require("../utils/checkPermissions");

const getAllUsers = async (req, res) => {
  //find all users whom role is "user" and remove password from response
  const users = await UserModel.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findOne({ _id: id }).select("-password");
  if (!user) {
    throw new NotFoundError("No User with such id");
  }
  // restrict access to only view user info if id matches with current user
  // so user cannot access routes with id of other users
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ user });
};

// UPDATE USER with findOneAndUpdate()
// const updateUser = async (req, res) => {
//   const { name, email } = req.body;
//   // check for name and email
//   if (!email || !name) {
//     throw new BadRequestError("Name and email must be provided");
//   }
//   // find user and update
//   const user = await UserModel.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   // create token user, since our value changed
//   const tokenUser = createTokenUser(user);
//   // attach cookies
//   attachCookiesToResponse({ res, payload: tokenUser });
//   // send back to front-end updated user info
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };

// update User with user.save();

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  // check for name and email
  if (!email || !name) {
    throw new BadRequestError("Name and email must be provided");
  }
  // find user
  const user = await UserModel.findOne({ _id: req.user.userId });
  // update user
  user.email = email;
  user.name = name;
  // save
  await user.save();
  // create token user, since our value changed
  const tokenUser = createTokenUser(user);
  // attach cookies
  attachCookiesToResponse({ res, payload: tokenUser });
  // send back to front-end updated user info
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  console.log(newPassword, oldPassword);
  // check for provided passwords
  if (newPassword === "" || oldPassword === "") {
    throw new BadRequestError("Values cant be empty");
  }
  // find user with id from req.user
  const user = await UserModel.findOne({ _id: req.user.userId });
  if (!user) {
    throw new NotFoundError("No user with such id");
  }
  //compare old passwords to match
  const isPasswordMatch = await comparePassword(oldPassword, user.password);
  // no match - 401
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Old password does not match");
  }
  // if old password provided from user matches with this user password
  // hash password here or we can use "pre" method in UserModel, then no need to hash it here it will hash automatically on user.save();
  user.password = await hashPassword(newPassword);
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! password updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
