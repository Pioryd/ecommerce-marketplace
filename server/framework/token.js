const jwt = require("jsonwebtoken");

exports.generate = async (data, expires_in) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: expires_in });
};

exports.verify = async (token) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) reject("Unable to verify token.");
      else resolve(decoded);
    });
  });
};
