const jwt = require("jsonwebtoken");

// create token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// verify token
const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// attach cookies with jwt
const attachCookiesToResponse = ({ res, payload }) => {
  //create jwt
  const token = createJWT({ payload });
  // attach cookies to response
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1day
    // send cookies with request, but in production only with https
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
