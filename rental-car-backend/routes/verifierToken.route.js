// const express = require("express");
// const router = express.Router();
// const authMiddleware  = require("../middleware/authMiddleware")
// // Route accessible uniquement par les administrateurs
// router.get('/admin', authMiddleware.verifyToken, authMiddleware.isAdmin, (req, res) => {
//     res.status(200).json({ message: 'Bienvenue, administrateur!' });
//   });
  
//   // Route accessible uniquement par les clients
//   router.get('/client', authMiddleware.verifyToken, authMiddleware.isClient, (req, res) => {
//     res.status(200).json({ message: 'Bienvenue, client!' });
//   });
  
//   // Route accessible par tout utilisateur authentifié
//   router.get('/user', authMiddleware.verifyToken, (req, res) => {
//     res.status(200).json({ message: 'Bienvenue, utilisateur authentifié!' });
//   });


// module.exports = router;
