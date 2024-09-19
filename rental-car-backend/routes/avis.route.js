const express = require("express");
const router = express.Router();
const avisController = require("../controllers/avis.controller");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = require('../middleware/authMiddleware');





router.get("/",
    authMiddleware.verifyToken,

    avisController.getAllAvis);

router.get("/:id",
    authMiddleware.verifyToken,

    avisController.getAvisById);

router.post(
    "/",

    authMiddleware.verifyToken, authMiddleware.isClient,  

    avisController.createNewAvis
);
router.put(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isClient,  


  avisController.updateAvisById
);


router.delete(
  "/:id",
  authMiddleware.verifyToken, 

  avisController.deleteAvisById
);

module.exports = router;
