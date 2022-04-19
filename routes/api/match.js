const { Router } = require("express");

const {
  CheckandMakeAMatch,
  removeMatch,
} = require("../../controllers/api/match");

const router = Router();

router.post("/", CheckandMakeAMatch);
router.delete("/:id", removeMatch);

module.exports = router;
