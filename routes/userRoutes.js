const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const userRouter = express.Router();

// userRouter.get("/", getAllUsers);
// userRouter.get("/showMe", showCurrentUser);
// userRouter.post("/updateUser", updateUser);
// userRouter.post("/updateUserPassword", updateUserPassword);
// userRouter.get("/:id", getSingleUser);

// stick authentication middleware to access user routes
// first authenticate the user, then check for admin
userRouter.route("/").get(authenticateUser, authorizePermissions, getAllUsers);
userRouter.route("/showMe").get(showCurrentUser);
userRouter.route("/updateUser").patch(updateUser);
userRouter.route("/updateUserPassword").patch(updateUserPassword);
// route with id should be last, so we can access showMe and etc. routes
userRouter.route("/:id").get(authenticateUser, getSingleUser);

module.exports = userRouter;
