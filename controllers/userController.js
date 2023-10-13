const { BadRequestError, NotFoundError } = require("../errors");
const UserModel = require("../models/User-Model");
const { StatusCodes } = require("http-status-codes");

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
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = (req, res) => {
  res.send("Show Current User");
};

const updateUser = (req, res) => {
  res.send(req.body);
};

const updateUserPassword = (req, res) => {
  res.send(req.body);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
