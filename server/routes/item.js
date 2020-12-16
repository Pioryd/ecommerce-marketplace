const express = require("express");

const itemController = require("../controllers/item");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/items", itemController.create);
router.delete("/items", authMiddleware.isAuth, itemController.remove);
router.delete("/items/:id", authMiddleware.isAuth, itemController.remove);
router.put("/items", authMiddleware.isAuth, itemController.update);
router.put("/items/:id", authMiddleware.isAuth, itemController.update);

module.exports = router;
