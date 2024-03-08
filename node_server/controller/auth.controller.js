const loginController = async (req, res) => {
  if (req.user) {
    const sid = uniqueId();
    const session = await SessionModel.create({ sid, user: req.user });
    res.cookie("sid", sid, { maxAge: 900000, httpOnly: true });
    res.send({
      details: "Login Success!",
    });
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("sid");
  res.send({
    details: "Logout Success!",
  });
};

const registerController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ details: "username or password is missing!" });

  await UserModel.create({ username, password });
  res.json({ details: "Registered Successfully!" });
};

module.exports = {
  loginController,
  logoutController,
  registerController,
};
