const Token = require("../util/token");

exports.isAuth = async (req, res, next) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);

  try {
    await Token.verify(token);
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

exports.isAdmin = async (req, res, next) => {
  return next();
};
