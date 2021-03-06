const express = require("express");

const accountController = require("../controllers/account");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/accounts", use(accountController.create));
router.post("/accounts/sign-in", use(accountController.signIn));
router.post("/accounts/recover", use(accountController.recover));
router.delete(
  "/accounts",
  authMiddleware.isAuth,
  use(accountController.remove)
);
router.put("/accounts", authMiddleware.isAuth, use(accountController.update));
router.get("/accounts", authMiddleware.isAuth, use(accountController.get));
router.post(
  "/accounts/refresh-token",
  authMiddleware.isAuth,
  use(accountController.refreshToken)
);

module.exports = router;
