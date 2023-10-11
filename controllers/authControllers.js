const register = async (req, res) => {
  res.send("Register");
};

const login = async (req, res) => {
  res.send("Login");
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = { register, login, logout };
