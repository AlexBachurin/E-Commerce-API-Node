const getAllUsers = (req, res) => {
  res.send("Get All Users");
};

const getSingleUser = (req, res) => {
  res.send("Get Single User");
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
