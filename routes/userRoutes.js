const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

const userRouter = express.Router();

// userRouter.get("/", getAllUsers);
// userRouter.get("/showMe", showCurrentUser);
// userRouter.post("/updateUser", updateUser);
// userRouter.post("/updateUserPassword", updateUserPassword);
// userRouter.get("/:id", getSingleUser);
userRouter.route("/").get(getAllUsers);
userRouter.route("/showMe").get(showCurrentUser);
userRouter.route("/updateUser").patch(updateUser);
userRouter.route("/updateUserPassword").patch(updateUserPassword);
// route with id should be last, so we can access showMe and etc. routes
userRouter.route("/:id").get(getSingleUser);

module.exports = userRouter;
