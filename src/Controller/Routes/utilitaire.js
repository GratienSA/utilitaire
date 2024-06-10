const express = require('express');
const router = express.Router();


// const myuploads= "/uploads"
// const path= require("path")
const { getUtilityVehicles, updateUtilityVehicle, deleteUtilityVehicle, insertVehicle, insertVehiclePicture } = require("../UtilitaireController");
// const storage= multer.diskStorage({
// destination: function(req,file, cb){

//     cb(null,myuploads )
// },
// filename: function(req,file, cb){
//     cb(null, file.fieldname+Date()+path.extname(file.originalname))
// }})
// const upload= multer({
// storage: storage,
// fileFilter: function(req, file, cb){
// const filetypes= /jpg|png|jpeg/;
// if(filetypes.test(path.extname(file.originalname).toLowerCase()) && filetypes.test(file.mimetype)){
//     return cb(null, true)
// }
// cb(null, false)


// }



// })

// // Ajouter un utilitaire à la table utilitaire
// // verifData est un middleware qui vérifie les données entrantes
router.post("/add",insertVehicle);
router.post('/insert/picture', insertVehiclePicture)


// Récupérer la liste des utilitaires
router.get("/allVehicles", getUtilityVehicles);

// Mettre à jour les informations d'un utilitaire existant
router.patch("/updateutilitaire/:id", updateUtilityVehicle);

// Supprimer un utilitaire
router.delete("/deleteutilitaire/:id", deleteUtilityVehicle);

module.exports = router;