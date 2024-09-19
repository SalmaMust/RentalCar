const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  UserSchema = new Schema({
  Nom:{
    type:String,
    required :[true ,'Le champ Nom est requis. Merci de le compléter.'],
    trim:true,
    maxlength: [20, 'Le nom ne peut pas dépasser 50 caractères.'] 

  },

 
  Email: {
    type:String,
    required :[true ,'Le champ Email est requis. Merci de le compléter.'],
    trim:true, unique: true,
    maxlength: [50, 'email ne peut pas dépasser 50 caractères.'] 

   
  },
  Mot_de_passe: {
    type: String,
    required: [true, 'Le champ mot de Passe est requis. Merci de le compléter.'],
    trim: true,
   
},
telephone: {
  type: Number,
  required: [true, 'Le champ Telephone  est requis. Merci de le compléter.'],
  trim: true,
 
},
adresse: {
  type: String,
  required: [true, 'Le champ Adress  est requis. Merci de le compléter.'],
  trim: true,
 
},
status: {
  type: String,
  required: [true, 'Le champ status  est requis. Merci de le compléter.'],
  enum :['Client','Client Fidele'],
  default:"Client",
  trim: true,
 
},


role: {
  type: String,
  enum: ['Admin', 'Client'],
  default: 'Client',
  required: false,
},



});

module.exports = mongoose.model('User', UserSchema);
