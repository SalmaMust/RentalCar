const UserSchema = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const validator = require("validator");

exports.getAllUsers = async (req, res) => {
  try {
    const response = await UserSchema.find();
    return res.status(200).json({
      successmessage: "Les Utilisateurs ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  const FoundUser = await UserSchema.findById(id);
  if (!FoundUser)
    return res.status(404).json({ errormessage: " utilisateur introuvable" });

  try {
    const response = await UserSchema.findById(id);
    return res.status(200).json({
      successmessage: "utilisateur a été récupéré avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur" + error,
    });
  }
};

exports.updateSingleUser = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la requête
  const { Nom,  Email,telephone, Mot_de_passe, adresse,status, role } = req.body;

  try {
    const updateSingleUser = await UserSchema.findByIdAndUpdate(
      id, // ID de user à mettre à jour
      {
        Nom,
        Email,
        telephone,
        Mot_de_passe,
        adresse,
        status,
        role,
      },
      { new: true }
    );

    if (!updateSingleUser) {
      return res.status(404).json({ errormessage: "Utilisateur introuvable" });
    }

    res.status(200).json({
      successmessage: "Utilisateur mis à jour avec succès",
      data: updateSingleUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deleteSingleUser = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de user supprimer

  try {
    const deletedUser = await UserSchema.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ errormessage: "Utilisateur introuvable" });
    }

    res.status(200).json({
      successmessage: "utilisateur supprimé avec succès",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ errormessage: "Erreur: " + error.message });
  }
};
exports.create = async (req, res) => {
  try {
    const { Nom, Email, Mot_de_passe, telephone, adresse, status, role } = req.body;

    // Vérifier si tous les champs requis sont fournis
    if (!Nom || !Email || !Mot_de_passe || !telephone || !adresse || !status) {
      return res.status(400).json({ errormessage: "Tous les champs sont obligatoires" });
    }

    // Valider l'email
    if (!validator.isEmail(Email)) {
      return res.status(400).json({ errormessage: "Adresse e-mail invalide" });
    }

    // Vérifier si l'utilisateur existe déjà avec cet e-mail
    const existingUser = await UserSchema.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ errormessage: "Email déjà existant" });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Mot_de_passe, salt);

    // Créer un nouvel utilisateur
    const newUser = new UserSchema({
      Nom,
      Email,
      Mot_de_passe: hashedPassword,
      telephone,
      adresse,
      status,
      role: role || "Client", // Si aucun rôle n'est spécifié, assigner "Client" par défaut
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Répondre avec un succès
    return res.status(201).json({
      successmessage: "Utilisateur créé avec succès",
      user: newUser,
    });
  } catch (error) {
    // Gérer les erreurs
    return res.status(500).json({
      errormessage: "Erreur lors de la création de l'utilisateur",
      error: error.message,
    });
  }
};
// exports.updateUserPassword = async (req, res) => {
//   const { id } = req.params;
//   const { currentPassword, newPassword, confirmPassword } = req.body;

//   try {
//     const user = await UserSchema.findById(id);

//     if (!user) {
//       return res.status(404).json({ errorMessage: "User not found" });
//     }

//     // Vérifier le mot de passe actuel
//     const isCurrentPasswordValid = await bcrypt.compare(
//       currentPassword,
//       user.Mot_de_passe
//     );

//     if (!isCurrentPasswordValid) {
//       return res
//         .status(400)
//         .json({ errorMessage: "The current password is incorrect" });
//     }

//     // Vérifier la correspondance entre le nouveau mot de passe et la confirmation
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({
//         errorMessage: "New passwords do not match",
//       });
//     }

//     // Hacher et mettre à jour le mot de passe
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     user.Mot_de_passe = hashedPassword;
//     await user.save();

//     return res
//       .status(200)
//       .json({ successMessage: "Password updated successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ errorMessage: "Erreur du serveur: " + error.message });
//   }
// };
// exports.addPostulation = async (req, res) => {
//   try {
//     const { userId, offerId } = req.body; // Extraire les données de la requête

//     const user = await user.findByIdAndUpdate(
//       userId,
//       {
//         $push: {
//           postulations: offerId,
//         },
//       },
//       { new: true }
//     ); // Utiliser $push pour ajouter l'offre à la liste des postulations

//     if (!user) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     res.json(user); // Renvoyer l'utilisateur mis à jour
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Erreur lors de lajout de la postulation" });
//   }
// };
