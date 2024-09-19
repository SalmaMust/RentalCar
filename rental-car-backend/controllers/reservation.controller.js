const voitureSchema = require("../models/voiture.model");
const clientSchema = require("../models/user.model");
const ReservationSchema = require("../models/reservation.model");
const FactureSchema = require("../models/facture.model")
const ContratSchema = require("../models/contrat.model")

require("dotenv").config();
// exports.createNewReservation = async (req, res) => {
//   const {
//     dateDebut,

//     status,
//     dateFin,
//     voiture,
//     client,
//     contrat
//   } = req.body;

//   // Vérification des champs obligatoires
//   if (!dateDebut || !status || !dateFin ) {
//     return res.status(400).json({
//       errormessage: "Tous les champs sont obligatoires",
//     });
//   }

//   try {
//     // Vérification de l'existence des références
//     const voitureExists = await voitureSchema.findById(voiture);
//     const clientExists = await clientSchema.findById(client);
//     const contratExists = await ContratSchema.findById(contrat);

//     if (!voitureExists || !clientExists || !contratExists) {
//       return res
//         .status(404)
//         .json({ errormessage: "voiture ou client introuvable" });
//     }
// // Calcul de la durée de la réservation
// const startDate = new Date(dateDebut);
// const endDate = new Date(dateFin);
// const durationInMilliseconds = endDate - startDate;

// // Calcul du nombre de jours et d'heures
// const durationInHours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
// let totalDays = Math.floor(durationInHours / 24);
// const extraHours = durationInHours % 24;
// // prix de chaque heure est 20% du jour et apres 5h on ajoute un nouveau jour  

// const montantTotal = voitureExists.calculateTotalAmount(totalDays, extraHours);


//     // Création de la voiture
//     const response = await ReservationSchema.create({
//       dateDebut,
//       status,
//       dateFin,
//       voiture,
//       client,
//       contrat
//     });

//       // Création de la facture associée
//       const facture = new FactureSchema({
//         Montant: montantTotal,
//         Date: new Date(),
//         Contrat: contratExists._id, 
//         reservation: response._id 
//       });
  
//       // Enregistrement de la facture
//       await facture.save();
  

// // prix de chaque heure est 20% du jour et apres 5h on ajoute un nouveau jour  
//     // Peuplement des références (model, type, maison)
//     const populatedReservation = await ReservationSchema.findById(response._id)
//       .populate("voiture")
//       .populate("client")
//       .populate("contrat");

//     return res.status(200).json({
//       successmessage: "Reservation créée avec succès",
//       data: populatedReservation,
//       facture: facture, // Retourner aussi la facture

//     });
//   } catch (error) {
//     return res.status(500).json({
//       errormessage: "Erreur: " + error.message,
//     });
//   }
// };


exports.createNewReservation = async (req, res) => {
  const { dateDebut, dateFin, voiture, client } = req.body;

  if (!dateDebut || !dateFin || !voiture || !client ) {
    return res.status(400).json({ errormessage: "Tous les champs sont obligatoires" });
  }

  try {
    const voitureExists = await voitureSchema.findById(voiture);
    const clientExists = await clientSchema.findById(client);
    // const contratExists = await ContratSchema.findById(contrat);

    if (!voitureExists || !clientExists ) {
      return res.status(404).json({ errormessage: "Voiture, client  introuvable" });
    }

    // Créer la réservation
    const reservation = new ReservationSchema({
      dateDebut,
      dateFin,
      voiture,
      client,
      
    });

    const savedReservation = await reservation.save();

    return res.status(200).json({
      successmessage: "Réservation créée avec succès",
      reservation: savedReservation
    });
  } catch (error) {
    return res.status(500).json({ errormessage: "Erreur: " + error.message });
  }
};





exports.getAllreservation = async (req, res) => {
  try {
    const response = await ReservationSchema.find()
      .populate("voiture")
      .populate("client")
      .populate("facture");  // Peupler la facture liée

    return res.status(200).json({
      successmessage: "Les reservations ont été récupérés avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur " + error,
    });
  }
};
exports.getReservationById = async (req, res) => {
  const { id } = req.params;
  const FoundReservation = await ReservationSchema.findById(id);
  if (!FoundReservation)
    return res.status(404).json({ errormessage: " Reservation introuvable" });

  try {
    const response = await ReservationSchema.findById(id)
      .populate("voiture")
      .populate("client")
      .populate("facture");  // Peupler la facture liée

    return res.status(200).json({
      successmessage: "la reservation a été récupéré avec succès",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      errormessage: "Erreur" + error,
    });
  }
};
exports.updateReservationById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la requête
  const {
    dateDebut: dateDebut,

    status: status,
    dateFin: dateFin,
    voiture: voiture,
    client: client,
  } = req.body; // Nouvelles données de voiture

  try {
    const updateReservationById = await ReservationSchema.findByIdAndUpdate(
      id, // ID de voiture à mettre à jour
      {
        dateDebut: dateDebut,
        status: status,
        dateFin: dateFin,
        voiture: voiture,
        client: client,
      },
      { new: true }
      //  ).populate('model')
      //   .populate('type')
      //   .populate('maison');// Pour obtenir le document mis à jour en réponse
    );
    if (!updateReservationById) {
      return res.status(404).json({ errormessage: "Reservation introuvable" });
    }

    res.status(200).json({
      successmessage: "reservation mis à jour avec succès",
      data: updateReservationById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errormessage: "Erreur du serveur: " + error.message });
  }
};

exports.deleteReservationById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'offre supprimer

  try {
    const deletedreservation = await ReservationSchema.findByIdAndDelete(id);

    if (!deletedreservation) {
      return res.status(404).json({ errormessage: "reservation introuvable" });
    }

    res.status(200).json({
      successmessage: "reservation supprimé avec succès",
      data: deletedreservation,
    });
  } catch (error) {
    res.status(500).json({ errormessage: "Erreur: " + error.message });
  }
};
exports.acceptReservation = async  (req, res) => {
  const { id } = req.params;

  try {
      const reservation = await ReservationSchema.findById(id);

      if (!reservation) {
          return res.status(404).json({ errormessage: "Réservation introuvable" });
      }

      // Mettre à jour le statut à "accepté"
      reservation.status = 'accepté';
      await reservation.save();

      return res.status(200).json({ successmessage: "Réservation acceptée avec succès" });
  } catch (error) {
      return res.status(500).json({ errormessage: "Erreur : " + error });
  }
};