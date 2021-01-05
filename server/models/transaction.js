const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    buyer_account_id: {
      type: String,
      required: true
    },
    items: {
      type: Map,
      of: Number,
      required: true
    },
    shipping: {
      name: {
        type: String,
        required: true
      },
      street_1: {
        type: String,
        required: true
      },
      street_2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      postal_code: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      pay_with: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", TransactionSchema);
