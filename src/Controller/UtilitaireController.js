const { pool } = require('../Services/Connexion')
const express = require('express')
const path = require('path')
const multer = require('multer')
const app = express()
const uploadDirectory = path.join(__dirname, 'uploads')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const insertVehiclePicture = async (req, res) => {
  let newFileName
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory)
    },
    filename: function (req, file, cb) {
      newFileName = `${file.fieldname}-${Date.now()}.jpg`
      cb(null, newFileName)
    },
  })

  const maxSize = 3 * 1000 * 1000

  let upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
      var filetypes = /jpeg|jpg|png/
      var mimetype = filetypes.test(file.mimetype)

      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      )

      if (mimetype && extname) {
        return cb(null, true)
      }

      cb(
        'Error: File upload only supports the ' +
          'following filetypes - ' +
          filetypes
      )
    },
  }).single('image')

  upload(req, res, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send({ newFileName: newFileName })
    }
  })
}

const insertVehicle = async (req, res) => {

  console.log(req.body)
  if (
    !req.body.VehiclesTitle ||
    !req.body.VehiclesBrand ||
    !req.body.VehiclesOverview ||
    !req.body.PricePerDay ||
    !req.body.FuelType ||
    !req.body.ModelYear ||
    !req.body.SeatingCapacity ||
    !req.body.Vimage1
  ) {
    
    return res.status(400).send({ error: 'Missing fields' })
  }

  try {
    
    const sql = `INSERT INTO tblvehicles (VehiclesTitle, VehiclesBrand, VehiclesOverview, PricePerDay, FuelType, ModelYear, SeatingCapacity, Vimage1) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    
    
    const result = await pool.query(sql, [
      req.body.VehiclesTitle,
      req.body.VehiclesBrand,
      req.body.VehiclesOverview,
      req.body.PricePerDay,
      req.body.FuelType,
      req.body.ModelYear,
      req.body.SeatingCapacity,
      req.body.Vimage1
    ])

   
    res.status(200).json({ result })
  } catch (error) {
    // Gestion des erreurs
    console.log(error.stack)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}


// Afficher la liste des véhicules utilitaires
const getUtilityVehicles = async (req, res) => {
  try {
    const [utilityVehicles] = await pool.query('SELECT * FROM tblvehicles');
    res.status(200).json(utilityVehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mettre à jour les informations d'un véhicule utilitaire existant
const updateUtilityVehicle = async (req, res) => {
  const vehicleId = req.params.id;
  const { VehiclesTitle, VehiclesBrand, VehiclesOverview, PricePerDay, FuelType, ModelYear, SeatingCapacity, Vimage1 } = req.body;

  if (!VehiclesTitle || !VehiclesBrand || !VehiclesOverview || !PricePerDay || !FuelType || !ModelYear || !SeatingCapacity || !Vimage1) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  try {
    const sql = `UPDATE tblvehicles SET VehiclesTitle = ?, VehiclesBrand = ?, VehiclesOverview = ?, PricePerDay = ?, FuelType = ?, ModelYear = ?, SeatingCapacity = ?, Vimage1 = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [VehiclesTitle, VehiclesBrand, VehiclesOverview, PricePerDay, FuelType, ModelYear, SeatingCapacity, Vimage1, vehicleId]);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: 'Utility vehicle updated successfully' });
    } else {
      res.status(404).json({ error: 'Utility vehicle not found or update failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Supprimer un véhicule utilitaire
const deleteUtilityVehicle = async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const sql = `DELETE FROM tblvehicles WHERE id = ?`;
    const [result] = await pool.execute(sql, [vehicleId]);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: 'Utility vehicle deleted successfully' });
    } else {
      res.status(404).json({ error: 'Utility vehicle not found or deletion failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getUtilityVehicles, updateUtilityVehicle, deleteUtilityVehicle,insertVehiclePicture,insertVehicle };

