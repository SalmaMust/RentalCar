const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controller");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = require('../middleware/authMiddleware');



  


router.get("/",   authMiddleware.verifyToken, authMiddleware.isAdmin,  

    userController.getAllUsers);

router.get("/:id",
    authMiddleware.verifyToken, 
    userController.getSingleUser);

router.post(
  "/",
  userController.create
);

router.put( "/:id",
    authMiddleware.verifyToken,  
    userController.updateSingleUser);

router.delete("/:id",
    authMiddleware.verifyToken,  
    userController.deleteSingleUser
);

module.exports = router;
