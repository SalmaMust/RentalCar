const express = require("express");
const router = express.Router();
const modelController = require("../controllers/modele.controller");
const jwt = require("jsonwebtoken");
const upload =require("../middleware/uploads");
const authMiddleware = require('../middleware/authMiddleware');


require("dotenv").config();




router.get("/",
    authMiddleware.verifyToken, 

     modelController.getAllModels);

router.get("/:id",
    authMiddleware.verifyToken,  

     modelController.getModelById);

router.post(
  "/",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  

upload.single('image'),  // Téléchargement de l'image

  modelController.createNewModele
);

router.put(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
upload.single('image'),  // Téléchargement de l'image

  modelController.updateModelById
);

// Delete voiture by id
router.delete(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
   modelController.deleteModelById
);
// router.get("/:name", maisonController.search);

module.exports = router;
