const modelSchema = require("../models/modele.model");
require("dotenv").config();

exports.createNewModele = async (req, res) => {
  const {
    name,
    description,
    maison
  
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
    const response = await modelSchema.create({
      name: name,
      description: description,
      image: image,
      maison: maison // Ajoutez le champ maison ici

     
    });
    return res.status(200).json({
      successmessage: "Model créé avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};

exports.getAllModels = async (req, res) => {
  try {
    const response = await modelSchema.find().populate('maison'); ;
    return res.status(200).json({
      successmessage: "Models ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};
exports.getModelById = async (req, res) => {
  const { id } = req.params;
  const FoundModel = await modelSchema.findById(id).populate('maison'); ;
  if (!FoundModel)
    return res.status(404).json({ errormessage: " Model introuvable" });

  try {
    const response = await modelSchema.findById(id);
    return res.status(200).json({
      successmessage: "la Model a été récupéré avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur" + error,
    });
  }
};
exports.updateModelById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la requête
  const {
    name: name,
    description: description,
    maison : maison
  } = req.body;
  const image = req.file ? req.file.path : null;
  // Nouvelles données de voiture

  try {
    const updateModelById = await modelSchema.findByIdAndUpdate(
      id, // ID de voiture à mettre à jour
      {
        name: name,
        description: description,
        image: image,
        maison: maison
      },
      { new: true } // Pour obtenir le document mis à jour en réponse
    );

    if (!updateModelById) {
      return res.status(404).json({ errormessage: "Model introuvable" });
    }

    res.status(200).json({
      successmessage: "Model mis à jour avec succès",
      data: updateModelById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deleteModelById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'offre supprimer

  try {
    const deleteModel = await modelSchema.findByIdAndDelete(id);

    if (!deleteModel) {
      return res.status(404).json({ errormessage: "Model introuvable" });
    }

    res.status(200).json({
      successmessage: "Model supprimé avec succès",
      data: deleteModel,
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
