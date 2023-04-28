// (Étape 1) Import du DRM mongoose et luxon
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

// (Étape 2) Définition du schéma boisson
// https://mongoosejs.com/docs/guide.html
// https://mongoosejs.com/docs/schematypes.html#schematype-options
const programmeSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    nom: { type: String, required: true },
    duree: { type: Number, required: true },
    nombre_repas_jour: { type: Number, required: true },
    calories_jour: { type: Number, required: true },
    aliments_recommandes: { type: [String], required: true },
    aliments_a_eviter: { type: [String], required: true },
   // objectif: { type: mongoose.Schema.Types.ObjectId, ref: 'Objectif', required: true }
  });

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
programmeSchema.virtual("id").get(function () {
    return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
programmeSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

// (Étape 4) Export du modèle boisson
// Les modèles sont responsables de la création et de la lecture des documents à partir de la base de données MongoDB.
module.exports = mongoose.model("programme", programmeSchema);