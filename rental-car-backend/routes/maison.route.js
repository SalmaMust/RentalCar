const express = require("express");
const router = express.Router();
const maisonController = require("../controllers/maison.controller");
const upload =require("../middleware/uploads");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = require('../middleware/authMiddleware');





router.get("/",
    authMiddleware.verifyToken,

     maisonController.getAllmaisons);

router.get("/:id",
    authMiddleware.verifyToken,

     maisonController.getMaisonById);

router.post(
    "/",

    authMiddleware.verifyToken, authMiddleware.isAdmin,  

    upload.single('image'),  // Téléchargement de l'image
    maisonController.createNewmaison
);
router.put(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  

      upload.single('image'), // Middleware pour gérer l'upload de l'image

  maisonController.updateMaisonById
);


// Delete voiture by id
router.delete(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isAdmin,  

   maisonController.deleteMaisonById
);

module.exports = router;
