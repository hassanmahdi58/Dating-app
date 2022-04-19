const { Router } = require("express");

const { getAUser } = require("../../controllers/api/search");

const router = Router();

router.post("/", getAUser);

module.exports = router;
