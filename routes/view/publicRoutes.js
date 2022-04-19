const { Router } = require("express");
const router = Router();

// The following will be available prior to logging in
const {
  renderHome,
  renderLogin,
  renderSignUp,
} = require("../../controllers/public");

router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/signup", renderSignUp);

module.exports = router;
