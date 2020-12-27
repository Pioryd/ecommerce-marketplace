const express = require("express");

const itemController = require("../controllers/item");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/items", authMiddleware.isAuth, use(itemController.list));
router.post(
  "/items/watch",
  authMiddleware.isAuth,
  use(itemController.setWatch)
);
router.post("/items/search", use(itemController.getSearch));
router.post(
  "/items/selling",
  authMiddleware.isAuth,
  use(itemController.getSelling)
);
router.post(
  "/items/watching",
  authMiddleware.isAuth,
  use(itemController.getWatching)
);

router.delete("/items", authMiddleware.isAuth, use(itemController.remove));

module.exports = router;
