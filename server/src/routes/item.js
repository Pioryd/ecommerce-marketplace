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
  "/items/watching",
  authMiddleware.isAuth,
  use(itemController.getWatching)
);
router.post(
  "/items/selling",
  authMiddleware.isAuth,
  use(itemController.getSelling)
);
router.post("/items/sold", authMiddleware.isAuth, use(itemController.getSold));
router.post(
  "/items/unsold",
  authMiddleware.isAuth,
  use(itemController.getUnsold)
);
router.post(
  "/items/bought",
  authMiddleware.isAuth,
  use(itemController.getBought)
);

router.delete("/items", authMiddleware.isAuth, use(itemController.close));

module.exports = router;
