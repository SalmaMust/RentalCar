const voitureSchema = require("../models/voiture.model");
const modelSchema = require("../models/modele.model");
const typeSchema = require("../models/type.model");

require("dotenv").config();
exports.createNewVoiture = async (req, res) => {
    const {
        matricule,
      name,
      model,
      type,
    //   maison,
      disponibilité,
      pricePerDay,
      visibility,
      deposit,
      tax_fees,
      min_days
    } = req.body;
  
    // Vérification des champs obligatoires
    if (!matricule || !name || !model || !type || !disponibilité || !pricePerDay || !deposit || !min_days) {
      return res.status(400).json({
        errormessage: "Tous les champs sont obligatoires",
      });
    }
  
    try {
      // Vérification de l'existence des références
      const modelExists = await modelSchema.findById(model);
      const typeExists = await typeSchema.findById(type);
    //   const maisonExists = await maisonSchema.findById(maison);
  
      if (!modelExists || !typeExists 
        // || !maisonExists
    ) {
        return res.status(404).json({ errormessage: "Model, Type ou Maison introuvable" });
      }
  
      // Création de la voiture
      const response = await voitureSchema.create({
        matricule,
        name,
        model,
        type,
        // maison,
        disponibilité,
        pricePerDay,
        visibility,
       deposit,
       tax_fees,

       min_days


      });
  
      // Peuplement des références (model, type, maison)
      const populatedVoiture = await voitureSchema
        .findById(response._id)
        .populate('model')
        .populate('type')
        // .populate('maison');
  
      return res.status(200).json({
        successmessage: "Voiture créée avec succès",
        data: populatedVoiture,
      });
    } catch (error) {
      return res.status(500).json({
        errormessage: "Erreur: " + error.message,
      });
    }
  };
  

exports.getAllvoiture = async (req, res) => {
  try {
    const params = req.params
    const response = await voitureSchema.find().populate('model').populate('type')
    // .populate('maison');
    return res.status(200).json({
      successmessage: "Les voitures ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};
exports.getVoitureById = async (req, res) => {
  const { id } = req.params;
  const FoundVoiture = await voitureSchema.findById(id);
  if (!FoundVoiture)
    return res.status(404).json({ errormessage: " voiture introuvable" });

  try {
    const response = await voitureSchema.findById(id)  
    .populate('model')
    .populate('type')
    // .populate('maison');
    return res.status(200).json({
      successmessage: "la voiture a été récupéré avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur" + error,
    });
  }
};
exports.updatevoitureById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la requête
  const {
    matricule: matricule,
    name: name,
    model: model,
    type: type,
    // maison: maison,
    disponibilité: disoponibilité,
    pricePerDay: pricePerDay,
    visibility: visibility,
    deposit:deposit,
    tax_fees:tax_fees,
    min_days :min_days
  } = req.body; // Nouvelles données de voiture

  try {
    const updatevoitureById = await voitureSchema.findByIdAndUpdate(
      id, // ID de voiture à mettre à jour
      {
        matricule: matricule,
        name: name,
        model: model,
        type: type,
        // maison: maison,
        disponibilité: disoponibilité,
        pricePerDay: pricePerDay,
        visibility: visibility,
        deposit:deposit,
        tax_fees:tax_fees,
        min_days:min_days
      },
      { new: true }
    //  ).populate('model')
    //   .populate('type')
    //   .populate('maison');// Pour obtenir le document mis à jour en réponse
    
    )
    if (!updatevoitureById) {
      return res.status(404).json({ errormessage: "voiture introuvable" });
    }

    res.status(200).json({
      successmessage: "voiture mis à jour avec succès",
      data: updatevoitureById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deletevoitureById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'offre supprimer

  try {
    const deletedvoiture = await voitureSchema.findByIdAndDelete(id);

    if (!deletedvoiture) {
      return res.status(404).json({ errormessage: "voiture introuvable" });
    }

    res.status(200).json({
      successmessage: "voiture supprimé avec succès",
      data: deletedvoiture,
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
