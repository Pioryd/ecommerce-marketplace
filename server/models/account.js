const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    recover_password: {
      type: String
    },
    items_watching: [{ type: mongoose.Schema.Types.ObjectId }],
    items_selling: [{ type: mongoose.Schema.Types.ObjectId }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", AccountSchema);
