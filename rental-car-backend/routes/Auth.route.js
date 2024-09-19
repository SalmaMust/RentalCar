const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.controller")
//  const { signup, signin } = require('../controllers/Auth.controller');

// User Login
router.post("/signin", AuthController.signin);

// User Register
router.post("/signup", AuthController.signup);

// router.post("/logout", AuthController.logout);


module.exports = router;
