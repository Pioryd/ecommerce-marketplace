const Token = require("../util/token");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const { email } = await Token.verify(token);
    req.body.email = email;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
