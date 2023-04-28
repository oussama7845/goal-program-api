// Import du modèle Programme
var Programme = require("../models/Programme");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const programmeValidationRules = () => {
    return [
        body("nom")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("First name must be specified.")
            .isAlphanumeric()
            .withMessage("First name has non-alphanumeric characters."),
      
            
        body("duree")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage(" must be specified.")
            .isNumeric()
            .withMessage("mus be specified."),

        body("nombre_repas_jour")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage(" must be specified."),

        body("calories_jour")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage(" must be specified."),

        body("aliments_recommandes")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage(" must be specified."),

        body("aliments_a_eviter")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("must be specified."),

        /*body("objectif")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage(" must be specified."),*/
    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

// Create
exports.create = [
    bodyIdValidationRule(),
    programmeValidationRules(),
    checkValidity,
    (req, res, next) => {
      // Création de la nouvelle instance de Programme à ajouter
      var newProgramme = new Programme({
        _id: req.body.id,
        nom: req.body.nom,
        duree: req.body.duree,
        nombre_repas_jour: req.body.nombre_repas_jour,
        calories_jour: req.body.calories_jour,
        aliments_recommandes: req.body.aliments_recommandes,
        aliments_a_eviter: req.body.aliments_a_eviter,
        //objectif: req.body.objectif,
      });
  
      // Ajout de Programme dans la bdd
      newProgramme
        .save()
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
    },
  ];
  
  // Read
  exports.getAll = (req, res, next) => {
    Programme.find()
      .populate('programme')
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };
  
  exports.getById = [
    paramIdValidationRule(),
    checkValidity,
    (req, res, next) => {
      Programme.findById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
    },
  ];
  

// Update
exports.update = [paramIdValidationRule(), programmeValidationRules(), checkValidity,(req, res, next) => {
    
    // Création de la nouvelle instance de Programme à modifier 
    var Programme = new Programme({
        _id: req.body.id,
        nom: req.body.nom,
        duree: req.body.duree,
        nombre_repas_jour: req.body.nombre_repas_jour,
        calories_jour: req.body.calories_jour,
        aliments_recommandes: req.body.aliments_recommandes,
        aliments_a_eviter: req.body.aliments_a_eviter,
       // objectif: req.body.objectif 
      });

      Programme.findByIdAndUpdate(req.params.id, Programme)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json("Programme with id "+req.params.id+" is not found !");
            }
            })
        .catch((error) => res.status(500).json(error));
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    Programme.findByIdAndRemove(req.params.id)
    .then((result) => {
        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json("Programme with id "+req.params.id+" is not found !");
          }
        })
    .catch((error) => res.status(500).json(error));
}];