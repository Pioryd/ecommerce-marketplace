const Token = require("../framework/token");

exports.is_auth = async (req, res, next) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);

  try {
    await Token.verify(token);
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

exports.is_admin = async (req, res, next) => {
  return next();
};
