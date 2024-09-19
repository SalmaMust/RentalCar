const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
require("dotenv").config();



// Créez l'instance d'Express
const app = express();
app.use(cors());
// Middlewares
app.use(express.json());
// Vérifier si le dossier 'uploads' existe
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Crée le dossier 'uploads'
  console.log("Dossier 'uploads' créé");
}
app.use("/uploads", express.static('uploads')); // Pour servir les fichiers statiques des uploads

app.use(express.urlencoded({ extended: true }));

require("./config/connect");



// Importez les routes
const AuthRoutes = require("./routes/Auth.route");
const voitureRoutes = require("./routes/voiture.route");
const maisonRoutes = require("./routes/maison.route");
const modelRoutes= require("./routes/model.route");
const typeRoutes = require("./routes/type.route");
const UserRoutes = require("./routes/User.route");
const reservationRoutes = require("./routes/reservation.route")
const contratRoutes = require("./routes/contrat.route")
const factureRoutes = require ("./routes/facture.route")
const avisRoutes = require('./routes/avis.route')



app.use("/auth", AuthRoutes);
//
app.use("/car", voitureRoutes);
app.use("/brand", maisonRoutes);
app.use("/model",modelRoutes);
app.use("/type", typeRoutes);
app.use("/user", UserRoutes);
app.use("/reservation",reservationRoutes);
app.use("/contract",contratRoutes)
app.use("/invoice", factureRoutes)
app.use("/avis",avisRoutes);



// Routesno
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Écoutez le serveur
app.listen(4000, () => {
  console.log("Le serveur fonctionne sur le port 4000");
});
