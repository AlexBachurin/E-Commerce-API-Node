const bcrypt = require("bcryptjs");

const comparePassword = async (userPassword, hashPassword) => {
  const isMatch = await bcrypt.compare(userPassword, hashPassword);
  return isMatch;
};

module.exports = comparePassword;
