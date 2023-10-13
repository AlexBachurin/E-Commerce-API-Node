const createTokenUser = (userObj) => {
  const tokenUser = {
    name: userObj.name,
    userId: userObj._id,
    role: userObj.role,
  };

  return tokenUser;
};

module.exports = createTokenUser;
