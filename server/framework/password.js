const crypto = require("crypto");

async function pbkdf2(salt, password) {
  return await new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      Number(process.env.PASSWORD_HASH_ITERATIONS),
      Number(process.env.PASSWORD_HASH_BYTES),
      process.env.PASSWORD_HASH_DIGEST,
      (err, hash) => {
        if (err) reject("Unable to create hash.");
        else resolve(hash.toString("hex"));
      }
    );
  });
}

exports.encrypt = async (password) => {
  const salt = crypto
    .randomBytes(Number(process.env.PASSWORD_SALT_BYTES))
    .toString("hex");
  const hash = await pbkdf2(password, salt);

  return { salt, hash };
};

exports.verify = async (password, salt, hash) => {
  const compare_hash = await pbkdf2(password, salt);

  if (hash != compare_hash) throw new Error("Wrong password.");
};
