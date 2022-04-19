const { Router } = require("express");

const {
  changeProfile,
  getUserProfile,
} = require("../../controllers/api/profile");

const router = Router();

router.put("/:id", changeProfile);
router.get("/:id", getUserProfile);

module.exports = router;
