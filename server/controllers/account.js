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

exports.sign_in = async (req, res) => {
  AccountService.sign_in(req.body).then(({ token }) => res.json({ token }));
};

exports.sign_out = async (req, res) => {
  AccountService.sign_out(req.body).then((data) =>
    res.json({ text: "signed out" })
  );
};
