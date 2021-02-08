const express = require("express");

const cartController = require("../controllers/cart");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.put("/cart", authMiddleware.isAuth, use(cartController.update));
router.get("/cart", authMiddleware.isAuth, use(cartController.get));
router.post("/cart/add", authMiddleware.isAuth, use(cartController.add));
router.post("/cart/remove", authMiddleware.isAuth, use(cartController.remove));
router.post(
  "/cart/transaction",
  authMiddleware.isAuth,
  use(cartController.transaction)
);

module.exports = router;
