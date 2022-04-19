const { Router } = require("express");
const router = Router();

// These are available to all (no sign in required)
const publicRoutes = require("./publicRoutes");

// In order to view these pages, the user will be required to sign in and enter their credentials
const privateRoutes = require("./privateRoutes");
const auth = require("../../middleware/auth");

router.use(publicRoutes);
router.use(auth, privateRoutes);

module.exports = router;
