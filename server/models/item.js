const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    expiration_date: {
      type: Date,
      required: true,
      default: Date.now
    },
    price: {
      type: Number,
      required: true
    },
    account_id: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
ItemSchema.index(
  { title: "text", description: "text" },
  { weights: { title: 2, description: 1 } }
);
module.exports = mongoose.model("Item", ItemSchema);
