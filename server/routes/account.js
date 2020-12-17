const express = require("express");

const accountController = require("../controllers/account");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/accounts", use(accountController.create));
router.post("/accounts/sign-in", use(accountController.signIn));
router.delete(
  "/accounts/sign-out",
  authMiddleware.isAuth,
  use(accountController.signOut)
);
router.put("/accounts", authMiddleware.isAuth, use(accountController.update));

router.put(
  "/accounts/:id",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  use(accountController.update)
);
router.delete(
  "/accounts/:id",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  use(accountController.remove)
);

module.exports = router;
