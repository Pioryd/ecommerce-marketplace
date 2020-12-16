const express = require("express");

const accountController = require("../controllers/account");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/accounts", accountController.create);
router.post("/accounts/sign-in", accountController.signIn);
router.delete(
  "/accounts/sign-out",
  authMiddleware.isAuth,
  accountController.signOut
);
router.put("/accounts", authMiddleware.isAuth, accountController.update);

router.put(
  "/accounts/:id",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  accountController.update
);
router.delete(
  "/accounts/:id",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  accountController.remove
);

module.exports = router;
