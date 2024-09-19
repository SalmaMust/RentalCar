const factureSchema = require("../models/facture.model");
const contratSchema = require("../models/contrat.model");
const reservationSchema = require ("../models/reservation.model")
require("dotenv").config();

exports.createNewFacture = async (req, res) => {
  const {
    Montant,
    Date,
    Contrat,
    reservation
    
  
  } = req.body;
  // Check if new data is not empty
  if (
    Montant === "" ||
    Date === "" ||
    Contrat === "" ||
    reservation === ""
  ) {
    return res.status(400).json({
      errormessage: "Tous les champs sont obligatoires",
    });
  }

  try {

    const contratExists = await contratSchema.findById(Contrat);
    const reservationExists = await reservationSchema.findById(reservation);

    if (!contratExists || !reservationExists) {
      return res.status(404).json({ errormessage: "contrat ou reservation introuvable" });
    }
    
    const response = await factureSchema.create({
        Montant: Montant,
        Date: Date,
        Contrat: Contrat,
        reservation : reservation

     
    });
    return res.status(200).json({
      successmessage: "Facture créé avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};

exports.getAllFactures = async (req, res) => {
  try {
    const response = await factureSchema.find().populate('Contrat'); ;
    return res.status(200).json({
      successmessage: "Factures ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};
exports.getFactureById = async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer la facture et remplir les informations de contrat
    const foundFacture = await factureSchema.findById(id).populate('Contrat');

    // Vérifier si la facture existe
    if (!foundFacture) {
      return res.status(404).json({ errormessage: "Facture introuvable" });
    }

    // Retourner la facture si elle existe
    return res.status(200).json({
      successmessage: "La facture a été récupérée avec succès",
      data: foundFacture,
    });
  } catch (error) {
    // Gérer les erreurs
    return res.status(500).json({
      errormessage: "Erreur lors de la récupération de la facture: " + error,
    });
  }
};

exports.updateFactureById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la requête
  const {
    Montant: Montant,
        Date: Date,
        Contrat: Contrat,
        reservation:reservation 
  } = req.body; 

  try {
    const updateFactureById = await factureSchema.findByIdAndUpdate(
      id, // ID de voiture à mettre à jour
      {
        Montant: Montant,
        Date: Date,
        Contrat: Contrat,
        reservation:reservation
      },
      { new: true } // Pour obtenir le document mis à jour en réponse
    );

    if (!updateFactureById) {
      return res.status(404).json({ errormessage: "Facture introuvable" });
    }

    res.status(200).json({
      successmessage: "Facture mis à jour avec succès",
      data: updateFactureById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deleteFactureById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'offre supprimer

  try {
    const deleteFacture = await factureSchema.findByIdAndDelete(id);

    if (!deleteFacture) {
      return res.status(404).json({ errormessage: "Facture introuvable" });
    }

    res.status(200).json({
      successmessage: "Facture supprimé avec succès",
      data: deleteFacture,
    });
  } catch (error) {
    res.status(500).json({ errormessage: "Erreur: " + error.message });
  }
};

// exports.search = async (req, res) => {
//   const { name } = req.params;

//   try {
//     const foundvoiture = await voitureSchema.findOne({ name: name });

//     if (!foundvoiture) {
//       return res.status(404).json({ errormessage: "voiture introuvable" });
//     }

//     return res.status(200).json({
//       successmessage: "La voiture a été récupérée avec succès",
//       data: foundvoiture,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errormessage: "Erreur: " + error.message,
//     });
//   }
// };
