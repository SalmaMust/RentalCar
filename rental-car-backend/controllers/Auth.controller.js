const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const User = require("../models/user.model")
exports.signup = async (req, res) =>{

    const {
        body: { Nom,  Email, Mot_de_passe, telephone, adresse, status, role },
      } = req;
    
      // Validation des champs
      if (
        Nom === "" ||
        Email === "" ||
        Mot_de_passe === "" ||
        telephone === "" ||
        adresse === "" ||
        status ===""
      ) 
      {
        return res.status(400).json({
          errormessage: "Tous les champs sont obligatoires",
        });
      }
    
      // Validation de l'adresse e-mail
      if (typeof Email !== "string" || !validator.isEmail(Email)) {
        return res.status(400).json({ errormessage: "Adresse e-mail invalide" });
      }
    

      // Vérifiez si l'email de l'utilisateur existe déjà
      const FoundUser = await User.findOne({ Email });
      if (FoundUser)
        return res.status(400).json({ errormessage: "Email déjà existant" });
    
      try {
        // Hash du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Mot_de_passe, salt);
    
        // Création d'un nouvel utilisateur
        const newUser = await User.create({
          Nom: Nom,
          Email: Email,
          Mot_de_passe: hashedPassword,
          telephone: telephone,
          adresse: adresse,
          role: role ? role : "Client",
          status: status ? status : "Client",
        });
    
        // Retourne un message de succès sans générer de token
        return res.status(200).json({
          successmessage: "Utilisateur créé avec succès",
          user: newUser,
        });
      } catch (error) {
        return res.status(500).json({
          errormessage: "Erreur " + error,
        });
      }
  





}
exports.signin = async (req, res) => {
    try {

    // get email and password from req.body
    const {
      body: { Email, Mot_de_passe },
    } = req;
  
 

    
    //  if  exists
    const FoundUser = await User.findOne({ Email });
    if (!FoundUser) 
      return res
        .status(400)
        .json({ errormessage: "L'email ou le mot de passe est erroné" });
  
    // Check if password is correct
  
    const isMatch = await bcrypt.compare(Mot_de_passe, FoundUser.Mot_de_passe);
  
    if (!isMatch)
      return res
        .status(400)
        .json({ errormessage: "L'email ou le mot de passe est erroné" });
  
    const user = {
      id: FoundUser._id,
      Nom: FoundUser.Nom,
      role: FoundUser.role,
    };
  
    const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET);
  
      res
        .status(200)
        .json({ message: "login success", user: user, token: token });
    } catch (error) {
      return res.status(500).json({
        errormessage: "Erreur " + error?.message,
      });
    }
  }
  
  






