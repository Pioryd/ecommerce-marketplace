const jwt = require("jsonwebtoken");

exports.is_auth = async (req, res, next) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    return next();
  });
};

exports.is_admin = async (req, res, next) => {
  return next();
};
