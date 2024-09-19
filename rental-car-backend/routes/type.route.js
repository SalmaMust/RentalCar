const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type.controller");
const jwt = require("jsonwebtoken");
const upload =require("../middleware/uploads");
const authMiddleware = require('../middleware/authMiddleware');


require("dotenv").config();



  


router.get("/",
    authMiddleware.verifyToken, 
    typeController.getAllTypes);

router.get("/:id", 
    authMiddleware.verifyToken,   
    typeController.getTypeById);

router.post(
  "/",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  

  upload.single('image'),  // Téléchargement de l'image

  typeController.createNewType
);

router.put(
  "/:id",
  upload.single('image'),  // Téléchargement de l'image

  authMiddleware.verifyToken, authMiddleware.isAdmin,  
  typeController.updateTypesById
);

router.delete(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  
   typeController.deleteTypeById
);

module.exports = router;
