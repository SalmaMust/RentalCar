const mongoose = require('mongoose');

const AvisSchema = mongoose.Schema({
    commentaire: { type: String, required: true },
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    }

});

module.exports = mongoose.model('Avis', AvisSchema);
