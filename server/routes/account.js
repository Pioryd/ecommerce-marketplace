const express = require("express");

const accountController = require("../controllers/account");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/accounts", use(accountController.create));
router.post("/accounts/sign-in", use(accountController.signIn));
router.delete(
  "/accounts",
  authMiddleware.isAuth,
  use(accountController.remove)
);

module.exports = router;
