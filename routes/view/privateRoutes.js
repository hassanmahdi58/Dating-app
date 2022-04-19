const { Router } = require("express");
const router = Router();

// The following will be available after logging in
const {
  renderProfile,
  renderSearch,
  renderProfileExplore,
} = require("../../controllers/private");

router.get("/search", renderSearch);
router.get("/profile", renderProfile);
router.get("/profile/:id", renderProfileExplore);

module.exports = router;
