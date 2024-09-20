const mongoose = require("mongoose");
//localhoost
mongoose
  .mongoose.connect("mongodb://127.0.0.1:27017/LocationVoitureBD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
