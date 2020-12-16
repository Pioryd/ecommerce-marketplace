const AccountService = require("../services/account");

exports.create = async (req, res) => {
  AccountService.create(req.body).then((data) => res.json({ text: "created" }));
};

exports.update = async (req, res) => {
  AccountService.update(req.body).then((data) => res.json({ text: "updated" }));
};

exports.remove = async (req, res) => {
  AccountService.remove(req.body).then((data) => res.json({ text: "removed" }));
};

exports.signIn = async (req, res) => {
  AccountService.signIn(req.body).then(({ token }) => res.json({ token }));
};

exports.signOut = async (req, res) => {
  AccountService.signOut(req.body).then((data) =>
    res.json({ text: "signed out" })
  );
};
