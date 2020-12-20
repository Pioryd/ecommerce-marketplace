const AccountService = require("../services/account");

exports.create = async (req, res) => {
  await AccountService.create(req.body);
  const { email, token } = await AccountService.signIn(req.body);
  res.json({ email, token });
};

exports.update = async (req, res) => {
  if ("newPassword" in req.body && "oldPassword" in req.body) {
    await AccountService.changePassword(req.body);
    res.json({});
  }
};

exports.remove = async (req, res) => {
  await AccountService.remove(req.body);
  res.json({});
};

exports.recover = async (req, res) => {
  await AccountService.recover(req.body);
  res.json({});
};

exports.signIn = async (req, res) => {
  const { email, token } = await AccountService.signIn(req.body);
  res.json({ token, email });
};

exports.signOut = async (req, res) => {
  const data = await AccountService.signOut(req.body);
  res.json({ text: "signed out" });
};
