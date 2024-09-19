const mongoose = require('mongoose');
// const Reservation = require('./reservation.model'); 


// Define the Facture schema
const FactureSchema = new mongoose.Schema({
    Montant: {
        type: Number,
        required: true
    },
    Contrat: {
        type: String,
        required: true
    },
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    status: { 
        type: String, 
        enum: ['en attente', 'payé'], 
        default: 'en attente' // La facture est en attente de paiement après création
    }
});

// Static method to create a Facture from a Reservation
// FactureSchema.statics.createFactureFromReservation = async function(reservationId) {
//     try {
//         const reservation = await Reservation.findById(reservationId).populate('voiture');
//         if (!reservation) {
//             throw new Error('Réservation non trouvée');
//         }

//         const dateDebut = new Date(reservation.dateDebut);
//         const dateFin = new Date(reservation.dateFin);
//         const diffTime = Math.abs(dateFin - dateDebut);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calcul des jours

//         const voiture = reservation.voiture;
//         const totalAmount = voiture.pricePerDay * diffDays; // Simplification du calcul du montant

//         const facture = new this({
//             Montant: totalAmount,
//             Contrat: reservation.contrat,
//             reservation: reservationId
//         });

//         await facture.save(); // Sauvegarde de la facture
//         return facture;
//     } catch (error) {
//         console.error('Erreur lors de la création de la facture:', error);
//         throw error;
//     }
// };

// Export the Facture model
module.exports = mongoose.model('Facture', FactureSchema);
