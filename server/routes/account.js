const express = require("express");

const account_controller = require("../controllers/account");
const auth_middleware = require("../middlewares/auth");

const router = express.Router();

router.post("/accounts", account_controller.create);
router.post("/accounts/sign-in", account_controller.sign_in);
router.delete(
  "/accounts/sign-out",
  auth_middleware.is_auth,
  account_controller.sign_out
);
router.put("/accounts", auth_middleware.is_auth, account_controller.update);

router.put(
  "/accounts/:id",
  auth_middleware.is_auth,
  auth_middleware.is_admin,
  account_controller.update
);
router.delete(
  "/accounts/:id",
  auth_middleware.is_auth,
  auth_middleware.is_admin,
  account_controller.remove
);

module.exports = router;
