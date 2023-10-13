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

// check user roles to authorizes permission to some routes for only selected roles
const authorizePermissions = (...authorizedRoles) => {
  // return back function to have access to req,res,next as a callback
  return (req, res, next) => {
    // check if user have role that is have permission to access admin protected routes
    // if not throw error
    if (!authorizedRoles.includes(req.user.role)) {
      throw new UnauthtorizedError("Unauthorized to access this route");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
