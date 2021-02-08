const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    account_id: {
      type: String,
      required: true
    },
    items: {
      type: Map,
      of: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
