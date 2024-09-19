const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    maison: { type: mongoose.Schema.Types.ObjectId, ref: 'Maison', required: true },


});

module.exports = mongoose.model('Model', modelSchema);
