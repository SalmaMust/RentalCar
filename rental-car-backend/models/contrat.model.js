const mongoose = require('mongoose');
const moment = require('moment'); // Importer moment


const contratSchema = mongoose.Schema({
    typeContrat: { type: String,enum: ['check in','check out'],  required: true },
    dateSignature: { 
        type: String, 
        required: true,
        default: moment().toDate() // Utiliser moment().toDate() pour obtenir un objet Date



    },
    details: { type: String },

});

module.exports = mongoose.model('Contrat', contratSchema);
