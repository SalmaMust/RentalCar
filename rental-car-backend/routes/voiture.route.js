const express = require("express");
const router = express.Router();
const voitureController = require("../controllers/voiture.controller");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = require('../middleware/authMiddleware');




router.get("/",
    authMiddleware.verifyToken, 
    voitureController.getAllvoiture);

router.get("/:id",
    authMiddleware.verifyToken,  
    voitureController.getVoitureById);

router.post(
  "/",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
  voitureController.createNewVoiture
);

router.put(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
  voitureController.updatevoitureById
);

router.delete(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
    voitureController.deletevoitureById
);

module.exports = router;
