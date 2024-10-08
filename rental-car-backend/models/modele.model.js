const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },


});

module.exports = mongoose.model('Model', modelSchema);
