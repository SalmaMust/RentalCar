const mongoose = require('mongoose');

const voitureSchema = mongoose.Schema({
    matricule: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    disponibilité: { type: String, enum: ['dispo', 'maintenance', 'louée'], required: true },
    pricePerDay: { type: Number, required: true },
    visibility: { type: Boolean, default: true },
    deposit: { type: Number, required: true , min: 50 },
    tax_fees: { type: Number, default: 0.19 },
    min_days: { type: Number, required: true }
});



module.exports = mongoose.model('Voiture', voitureSchema);
