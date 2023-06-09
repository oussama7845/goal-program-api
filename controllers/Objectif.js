// Import du modèle Objectif
var Objectif = require("../models/Objectif");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const ObjectifValidationRules = () => {
    return [   
        body("nom")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Name must be specified.")
            .isAlphanumeric()
            .withMessage("Name has non-alphanumeric characters."),

        body("description")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Description must be specified."),
            
        
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
exports.create = [bodyIdValidationRule(), ObjectifValidationRules(), checkValidity, (req, res, next) => {
    
    // Création de la nouvelle instance de Objectif à ajouter 
    var newObjectif = new Objectif({
        _id: req.body.id,
        nom: req.body.nom,
        description: req.body.description,

      });

    // Ajout de Objectif dans la bdd 
    newObjectif.save()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
}];

// Read
exports.getAll = (req, res, next) => {
    Objectif.find()
    .populate("objectif")
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Objectif.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
}];

// Update
exports.update = [paramIdValidationRule(), ObjectifValidationRules(), checkValidity,(req, res, next) => {
    
    // Création de la nouvelle instance de Objectif à modifier 
    var Objectif = new Objectif({
        _id: req.params.id,
        nom: req.body.nom,
        description: req.body.description,

      });

      Objectif.findByIdAndUpdate(req.params.id, Objectif)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json("Objectif with id "+req.params.id+" is not found !");
            }
            })
        .catch((error) => res.status(500).json(error));
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    Objectif.findByIdAndRemove(req.params.id)
    .then((result) => {
        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json("Objectif with id "+req.params.id+" is not found !");
          }
        })
    .catch((error) => res.status(500).json(error));
}]; 