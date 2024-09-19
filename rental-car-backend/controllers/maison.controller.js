const maisonSchema = require("../models/maison.model");
require("dotenv").config();

exports.createNewmaison = async (req, res) => {
  const {
    name,
    description,
    
  
  } = req.body;
  const image = req.file ? req.file.path : ''; // Récupérer le chemin de l'image si elle existe

  // Check if new data is not empty
  if (
    name === "" ||
    description === "" ||
    image === "" 
  ) {
    return res.status(400).json({
      errormessage: "Tous les champs sont obligatoires",
    });
  }

  try {
    const response = await maisonSchema.create({
      name: name,
      description: description,
      image: image
     
    });
    return res.status(200).json({
      successmessage: "Maison créé avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};

exports.getAllmaisons = async (req, res) => {
  try {
    const response = await maisonSchema.find();
    return res.status(200).json({
      successmessage: "Maisons ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};
exports.getMaisonById = async (req, res) => {
  const { id } = req.params;
  const FoundMaison = await maisonSchema.findById(id);
  if (!FoundMaison)
    return res.status(404).json({ errormessage: " maison introuvable" });

  try {
    const response = await maisonSchema.findById(id);
    return res.status(200).json({
      successmessage: "la Maison a été récupéré avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur" + error,
    });
  }
};
exports.updateMaisonById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la requête
  const {
    name: name,
    description: description,
  } = req.body; // Nouvelles données de voiture
  const image = req.file ? req.file.path : null;

  try {
    const updatemaisonById = await maisonSchema.findByIdAndUpdate(
      id, // ID de voiture à mettre à jour
      {
        name: name,
        description: description,
        image: image
      },
      { new: true } // Pour obtenir le document mis à jour en réponse
    );

    if (!updatemaisonById) {
      return res.status(404).json({ errormessage: "Maison introuvable" });
    }

    res.status(200).json({
      successmessage: "Maison mis à jour avec succès",
      data: updatemaisonById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deleteMaisonById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'offre supprimer

  try {
    const deleteMaison = await maisonSchema.findByIdAndDelete (id);

    if (!deleteMaison) {
      return res.status(404).json({ errormessage: "Maison introuvable" });
    }

    res.status(200).json({
      successmessage: "maison supprimé avec succès",
      data: deleteMaison,
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
