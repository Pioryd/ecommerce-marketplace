const express = require("express");

const itemController = require("../controllers/item");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/items", use(itemController.create));
router.delete("/items", authMiddleware.isAuth, use(itemController.remove));
router.delete("/items/:id", authMiddleware.isAuth, use(itemController.remove));
router.put("/items", authMiddleware.isAuth, use(itemController.update));
router.put("/items/:id", authMiddleware.isAuth, use(itemController.update));

module.exports = router;
