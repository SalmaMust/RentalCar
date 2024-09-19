const typeSchema = require("../models/type.model");
require("dotenv").config();

exports.createNewType = async (req, res) => {
  const {
    name,
    description,
  
  } = req.body;
  const image = req.file ? req.file.path : ''; // Récupérer le chemin de l'image si elle existe

  // Check if new data is not empty
  if (
    name === "" ||
    description === "" 
  

  ) {
    return res.status(400).json({
      errormessage: "Tous les champs sont obligatoires",
    });
  }

  try {
    const response = await typeSchema.create({
      name: name,
      description: description,
      image: image,

     
    });
    return res.status(200).json({
      successmessage: "Type créé avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const response = await typeSchema.find();
    return res.status(200).json({
      successmessage: "Types ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};
exports.getTypeById = async (req, res) => {
  const { id } = req.params;
  const FoundType = await typeSchema.findById(id);
  if (!FoundType)
    return res.status(404).json({ errormessage: " Type introuvable" });

  try {
    const response = await typeSchema.findById(id);
    return res.status(200).json({
      successmessage: "la Type a été récupéré avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur" + error,
    });
  }
};
exports.updateTypesById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la requête
  const {
    name: name,
    description: description,
  } = req.body; // Nouvelles données de voiture
  const image = req.file ? req.file.path : null;


  try {
    const updateTypeById = await typeSchema.findByIdAndUpdate(
      id, // ID de voiture à mettre à jour
      {
        name: name,
        description: description,
        image: image,

      },
      { new: true } // Pour obtenir le document mis à jour en réponse
    );

    if (!updateTypeById) {
      return res.status(404).json({ errormessage: "Type introuvable" });
    }

    res.status(200).json({
      successmessage: "Type mis à jour avec succès",
      data: updateTypeById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deleteTypeById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'offre supprimer

  try {
    const deleteType = await typeSchema.findByIdAndDelete(id);

    if (!deleteType) {
      return res.status(404).json({ errormessage: "Type introuvable" });
    }

    res.status(200).json({
      successmessage: "Type supprimé avec succès",
      data: deleteType,
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
