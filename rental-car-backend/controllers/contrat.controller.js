const contratSchema = require("../models/contrat.model");
require("dotenv").config();

exports.createNewcontrat = async (req, res) => {
  const {
    typeContrat,
    dateSignature,
    details
    
  
  } = req.body;

  // Check if new data is not empty
  if (
    typeContrat === "" ||
    dateSignature === "" ||
    details === "" 
  ) {
    return res.status(400).json({
      errormessage: "Tous les champs sont obligatoires",
    });
  }

  try {
    const response = await contratSchema.create({
        typeContrat: typeContrat,
        dateSignature: dateSignature,
        details: details
     
    });
    return res.status(200).json({
      successmessage: "Contrat créé avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};

exports.getAllcontrats = async (req, res) => {
  try {
    const response = await contratSchema.find();
    return res.status(200).json({
      successmessage: "Contrats ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};
exports.getContratById = async (req, res) => {
  const { id } = req.params;
  const FoundContrat = await contratSchema.findById(id);
  if (!FoundContrat)
    return res.status(404).json({ errormessage: " Contrat introuvable" });

  try {
    const response = await contratSchema.findById(id);
    return res.status(200).json({
      successmessage: "la Contrat a été récupéré avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur" + error,
    });
  }
};
exports.updateContratById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la requête
  const {
    typeContrat : typeContrat,
    dateSignature : dateSignature,
    details : details
  } = req.body; // Nouvelles données de voiture

  try {
    const updateContratById = await contratSchema.findByIdAndUpdate(
      id, // ID de voiture à mettre à jour
      {
        typeContrat: typeContrat,
        dateSignature: dateSignature,
        details: details
      },
      { new: true } 
    );

    if (!updateContratById) {
      return res.status(404).json({ errormessage: "Contrat introuvable" });
    }

    res.status(200).json({
      successmessage: "contrat mis à jour avec succès",
      data: updateContratById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deleteContratById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'offre supprimer

  try {
    const deletecontrat = await contratSchema.findByIdAndDelete (id);

    if (!deletecontrat) {
      return res.status(404).json({ errormessage: "Contrat introuvable" });
    }

    res.status(200).json({
      successmessage: "contrat supprimé avec succès",
      data: deletecontrat,
    });
  } catch (error) {
    res.status(500).json({ errormessage: "Erreur: " + error.message });
  }
};

