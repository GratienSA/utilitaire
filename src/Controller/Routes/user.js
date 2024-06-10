const express = require('express');
const router = express.Router();

const { register, login, getAllUsers, updateUserProfile, deleteUserProfile } = require('../UserController');
// importer les différents middlewares
// const { verifData, verifUpdate } = require("../../Utils/middlewares");

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllUsers)
router.patch('/updateprofile/:id', updateUserProfile); // Utiliser :id au lieu de :client_id
router.delete('/deleteprofile/:id', deleteUserProfile); // Ajouter :id pour récupérer l'ID de l'utilisateur à supprimer

module.exports = router;