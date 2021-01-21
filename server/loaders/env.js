const path = require("path");
const dotenv = require("dotenv");

module.exports = function () {
  dotenv.config();
  dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV}`) });
};
