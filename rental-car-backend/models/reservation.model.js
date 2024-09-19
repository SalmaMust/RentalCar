const mongoose = require('mongoose');
const moment = require('moment'); // Importer moment
const FactureSchema = require('./facture.model')
const voitureSchema = require('../models/voiture.model'); // Assurez-vous que le chemin est correct
const calculateAmount = require('../services/calculateAmount')



const ReservationSchema = mongoose.Schema({

    dateDebut: { type:String, required: true , default: moment().format('YYYY-MM-DD')
    },
    status: { 
        type: String, 
        required: true, 
        enum: ['en attente', 'accepté', 'confirmé','terminé'], 
        default: 'en attente' 
    },
    dateFin: { type: String, required: true ,default: moment().format('YYYY-MM-DD')
    },
    voiture: { type: mongoose.Schema.Types.ObjectId, ref: 'Voiture', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // contrat: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrat', required: true },
    facture: { type: mongoose.Schema.Types.ObjectId, ref: 'Facture' }  
});
// Middleware post-save pour appeler la méthode de création de facture
// Middleware post-save pour le schéma de réservation
ReservationSchema.post('save', async function (doc, next) { 
    try {
        // Vérifiez si une facture a déjà été créée pour cette réservation.
        // Si "doc.facture" est vide (null ou indéfini), cela signifie qu'il n'y a pas encore de facture.
        if (!doc.facture) {
            
            // Calculer la durée de la réservation en heures et en jours
            const startDate = new Date(doc.dateDebut);  // Date de début de la réservation
            const endDate = new Date(doc.dateFin);      // Date de fin de la réservation
            
            // Calculer la différence entre la date de fin et la date de début en millisecondes
            const durationInMilliseconds = endDate - startDate;
            
            // Convertir la durée en heures
            const durationInHours = Math.floor(durationInMilliseconds / (1000 * 60 * 60)); // (1000 ms/s * 60 s/min * 60 min/h)
            
            // Calculer le nombre de jours complets de la réservation
            let totalDays = Math.floor(durationInHours / 24);
            
            // Calculer le nombre d'heures supplémentaires (les heures restantes qui ne complètent pas un jour)
            const extraHours = durationInHours % 24;

            // Récupérer la voiture liée à la réservation via son ID (doc.voiture)
            const voiture = await voitureSchema.findById(doc.voiture);
            
            // Calculer le montant total de la réservation.
            // La méthode "calculateTotalAmount" doit être définie dans le modèle de voiture.
            // Elle prendra en compte le nombre de jours et les heures supplémentaires pour le calcul.
            const montantTotal = calculateAmount.calculateTotalAmount(totalDays, extraHours);

            // Créer un nouveau document de facture dans la collection Facture.
            // On stocke le montant calculé et on lie la facture à cette réservation.
            const facture = new FactureSchema({
                Montant: montantTotal,  // Montant calculé pour la réservation
                reservation: doc._id    // Lier la facture à la réservation actuelle
            });

            // Sauvegarder la facture dans la base de données
            await facture.save();

            // Mettre à jour la réservation en ajoutant l'ID de la facture créée
            doc.facture = facture._id;

            // Sauvegarder les modifications de la réservation dans la base de données
            await doc.save();
        }

        // Appeler la fonction next() pour passer à l'étape suivante dans le middleware
        next();
    } catch (error) {
        // En cas d'erreur, appeler next() avec l'erreur pour la gestion d'erreurs
        next(error);
    }
});


module.exports = mongoose.model('Reservation', ReservationSchema);
