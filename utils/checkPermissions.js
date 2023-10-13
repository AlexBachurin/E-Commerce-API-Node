const { UnauthtorizedError } = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  //admin can access all routes, so if user.role is admin we just return and continue
  if (requestUser.role === "admin") return;
  // user who makes a request can only access route which matches his own id
  if (requestUser.userId === resourceUserId.toString()) return;
  // if user tries to access route with another user id, throw error
  throw new UnauthtorizedError("Not authorized to access this route");
};

module.exports = checkPermissions;
