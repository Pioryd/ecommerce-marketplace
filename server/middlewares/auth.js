const Token = require("../util/token");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const { id } = await Token.verify(token);
    req.body.accountId = id;
    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(403);
  }
};
