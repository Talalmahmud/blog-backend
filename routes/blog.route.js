const express = require("express");
const { userAuthentication } = require("../middleware/auth");
const router = express.Router();

router.get("/token", userAuthentication);

module.exports = router;
