const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = require('../middleware/authMiddleware');



  

// router.put("/:id/status" ,
//     authMiddleware.verifyToken, authMiddleware.isAdmin,  
//     reservationController.updateReservationStatus);
router.get("/", 
    authMiddleware.verifyToken,  authMiddleware.isAdmin, 
    reservationController.getAllreservation);

router.get("/:id",
    authMiddleware.verifyToken, 
    reservationController.getReservationById);

router.post(
  "/",
  authMiddleware.verifyToken, authMiddleware.isClient,  
reservationController.createNewReservation
);

router.put(
  "/:id",
  authMiddleware.verifyToken, authMiddleware.isClient,  
reservationController.updateReservationById
);

router.delete(
  "/:id",
  authMiddleware.verifyToken,  
reservationController.deleteReservationById
);
router.put("/:id/accept", authMiddleware.verifyToken, authMiddleware.isAdmin,
  reservationController.acceptReservation);



module.exports = router;
