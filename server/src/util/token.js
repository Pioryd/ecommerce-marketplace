const jwt = require("jsonwebtoken");

exports.generate = (data, expiresIn) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn });
};

exports.verify = async (token) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) reject("Unable to verify token. " + err);
      else resolve(decoded);
    });
  });
};
