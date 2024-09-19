const express = require("express");
const router = express.Router();
const contratController = require("../controllers/contrat.controller");
const authMiddleware = require('../middleware/authMiddleware');

const jwt = require("jsonwebtoken");
require("dotenv").config();




// all voitures
router.get("/",
     authMiddleware.verifyToken,
     contratController.getAllcontrats);

// Get voiture by id
router.get("/:id",
    authMiddleware.verifyToken,
    contratController.getContratById);

router.post(
  "/",
 authMiddleware.verifyToken, authMiddleware.isAdmin,  
  contratController.createNewcontrat
);

// Update a voiture by id
router.put(
  "/:id",
  authMiddleware.verifyToken,
  contratController.updateContratById
);

router.delete(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
  contratController.deleteContratById
);
// router.get("/:name", maisonController.search);

module.exports = router;
