const express = require("express");
const router = express.Router();
const factureController = require("../controllers/facture.controller");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/authMiddleware');
 
require("dotenv").config();




router.get("/", 
    authMiddleware.verifyToken, authMiddleware.isAdmin,  
    factureController.getAllFactures);


router.get("/:id",
      authMiddleware.verifyToken, 
    factureController.getFactureById);

router.post(
  "/",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
factureController.createNewFacture
);

router.put(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
  factureController.updateFactureById
);

router.delete(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
  factureController.deleteFactureById
);

module.exports = router;
