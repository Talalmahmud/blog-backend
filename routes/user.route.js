const express = require("express");
const {
    userRegister,
    showUsers,
    userVerified,
    userLogin,
    userLogout,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);

router.get("/alluser", showUsers);
router.get("/verify/:id", userVerified);
module.exports = router;
