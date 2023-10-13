const { UnauthenticatedError, UnauthtorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  // get token from cookies
  const token = req.signedCookies.token;
  //check if token is present
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const payload = isTokenValid({ token });
    // console.log(payload);
    // destructure what we get from token payload
    const { name, userId, role } = payload;
    // add to request
    req.user = { name, userId, role };
    // pass to next
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (req, res, next) => {
  //  check user role, if its role is admin, authorize permisson to the route
  // if not throw error with 403
  // we have access to req.user, since its our second middleware
  if (req.user.role !== "admin") {
    throw new UnauthtorizedError("No permission to access this route");
  } else {
  }
  next();
};

module.exports = { authenticateUser, authorizePermissions };
