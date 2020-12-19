const AccountService = require("../services/account");

exports.create = async (req, res) => {
  await AccountService.create(req.body);
  const { email, token } = await AccountService.signIn(req.body);
  res.json({ email, token });
};

exports.update = async (req, res) => {
  const data = await AccountService.update(req.body);
  res.json({ text: "updated" });
};

exports.remove = async (req, res) => {
  const data = await AccountService.remove(req.body);
  res.json({ text: "removed" });
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
