const AvisSchema = require("../models/avis.model");
require("dotenv").config();
const ReservationSchema = require("../models/reservation.model");

exports.createNewAvis = async (req, res) => {
  const {
    commentaire,
    reservation
    
  
  } = req.body;

  // Check if new data is not empty
  if (
    commentaire === "" 
    
  ) {
    return res.status(400).json({
      errormessage: "Tous les champs sont obligatoires",
    });
  }

  try {
    const reservationExists = await ReservationSchema.findById(reservation);

    const response = await AvisSchema.create({
        commentaire: commentaire,
        reservation:reservationExists._id
     
    });
    return res.status(200).json({
      successmessage: "Avis créé avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};

exports.getAllAvis = async (req, res) => {
  try {
    const response = await AvisSchema.find();
    return res.status(200).json({
      successmessage: "Avis ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};
exports.getAvisById = async (req, res) => {
  const { id } = req.params;
  const FoundAvis = await AvisSchema.findById(id);
  if (!FoundAvis)
    return res.status(404).json({ errormessage: " Avi introuvable" });

  try {
    const response = await AvisSchema.findById(id);
    return res.status(200).json({
      successmessage: "Avi a été récupéré avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur" + error,
    });
  }
};
exports.updateAvisById = async (req, res) => {
  const { id } = req.params; 
  const {
    commentaire : commentaire,
    reservation : reservation
    
  } = req.body; // Nouvelles données de voiture

  try {
    const updateAvisById = await contratSchema.findByIdAndUpdate(
      id, 
      {
        commentaire : commentaire,
        reservation : reservation
        
      },
      { new: true } 
    );

    if (!updateAvisById) {
      return res.status(404).json({ errormessage: "Avi introuvable" });
    }

    res.status(200).json({
      successmessage: "Avi mis à jour avec succès",
      data: updateAvisById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deleteAvisById = async (req, res) => {
  const { id } = req.params; 

  try {
    const deleteAvi = await contratSchema.findByIdAndDelete (id);

    if (!deleteAvi) {
      return res.status(404).json({ errormessage: "Avi introuvable" });
    }

    res.status(200).json({
      successmessage: "Avi supprimé avec succès",
      data: deleteAvi,
    });
  } catch (error) {
    res.status(500).json({ errormessage: "Erreur: " + error.message });
  }
};

