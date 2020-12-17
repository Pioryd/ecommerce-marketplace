const AccountService = require("../services/account");

exports.create = async (req, res) => {
  const data = await AccountService.create(req.body);
  res.json({ text: "created" });
};

exports.update = async (req, res) => {
  const data = await AccountService.update(req.body);
  res.json({ text: "updated" });
};

exports.remove = async (req, res) => {
  const data = await AccountService.remove(req.body);
  res.json({ text: "removed" });
};

exports.signIn = async (req, res) => {
  const { token } = await AccountService.signIn(req.body);
  res.json({ token });
};

exports.signOut = async (req, res) => {
  const data = await AccountService.signOut(req.body);
  res.json({ text: "signed out" });
};
