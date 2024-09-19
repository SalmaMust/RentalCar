const mongoose = require("mongoose");
//localhoost
mongoose
  .connect("mongodb://localhost:27017/LocationVoitureBD", {
  })
  //connexion
  .then(() => {
    console.log("connected");
  })
  //erreur
  .catch((err) => {
    console.log(err);
  });
module.exports = mongoose;
