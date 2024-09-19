const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image:{type:String },
  voitures: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "voiture",
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("Type", typeSchema);
