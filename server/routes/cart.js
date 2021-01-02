const express = require("express");

const cartController = require("../controllers/cart");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/cart", authMiddleware.isAuth, use(cartController.add));
router.put("/cart", authMiddleware.isAuth, use(cartController.update));
router.get("/cart", authMiddleware.isAuth, use(cartController.get));
router.post("/cart/remove", authMiddleware.isAuth, use(cartController.remove));

module.exports = router;
