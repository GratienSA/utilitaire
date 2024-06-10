// Import des modules et configuration
const { pool } = require('../Services/Connexion'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

// Fonction d'inscription
const register = async (req, res) => {
  // Vérification des champs requis dans la requête
  const { email, password, FullName, ContactNo, dob, Address, City, Country } = req.body;
  if (!email || !password || !FullName || !ContactNo || !dob || !Address || !City || !Country) {
    res.status(400).json({ error: 'missing fields' }); // Retourne une erreur 400 si des champs sont manquants
    return;
  }

  try {
    // Vérification si l'utilisateur existe déjà dans la base de données
    const [existingUser] = await pool.query('SELECT * FROM tblusers WHERE EmailId = ?', [email]);
    if (existingUser.length !== 0) {
      res.status(400).json({ error: 'Email already exists' }); 
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Requête d'insertion dans la base de données
    const sql = `INSERT INTO tblusers (FullName, EmailId, Password, ContactNo, dob, Address, City, Country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [FullName, email, hashedPassword, ContactNo, dob, Address, City, Country]);

    // Vérification du succès de l'insertion
    if (result.affectedRows > 0) {
      res.status(200).json({ success: 'Registration successful' }); 
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  if (!req.body.identifier || !req.body.password) {
    res.status(400).json({ error: 'missing fields' })
    return
  }
  let identifier = req.body.identifier
  let password = req.body.password

  try {
    const values = [identifier, identifier]
    const sql = `SELECT * FROM tblusers INNER JOIN role ON tblusers.id_role = role.id_role WHERE EmailId  =  ?  AND isActive = 1`
    const [result] = await pool.query(sql, values)

    if (result.length === 0) {
      res
        .status(401)
        .json({ error: 'Invalid credentials or account not activated' })
      return
    } else {
      await bcrypt.compare(
        password,
        result[0].Password,
        function (err, bcyrptresult) {
          if (err) {
            res.status(401).json({ error: 'Invalid credentials' })
            return
          }

          const token = jwt.sign(
            {
              email: result[0].EmailId,
              id: result[0].id,
            },
            process.env.MY_SUPER_SECRET_KEY,
            { expiresIn: '20d' }
          )
          console.log()

          res.status(200).json({ jwt: token, role: result[0].name_role })
          return
        }
      )
    }
  } catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}



// Fonction pour avoir tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const sql = `SELECT * FROM tblusers`;
    const [result] = await pool.query(sql);

    res.status(200).json({ result });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: 'Server error' });
  }
}

const updateUserProfile = async (req, res) => {
  const clientId = req.params.id;
  const { FullName, email, ContactNo, dob, Address, City, Country } = req.body;
  if (!FullName || !email || !ContactNo || !dob || !Address || !City || !Country) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    // Requête pour mettre à jour les informations du profil de l'utilisateur
    const sql = `UPDATE tblusers SET FullName = ?, EmailId = ?, ContactNo = ?, dob = ?, Address = ?, City = ?, Country = ? WHERE id = ?`;
    const values = [FullName, email, ContactNo, dob, Address, City, Country, clientId];
    const [result] = await pool.execute(sql, values);

    // Vérification du succès de la mise à jour
    if (result.affectedRows > 0) {
      res.status(200).json({ success: 'Profile updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found or profile update failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Fonction pour supprimer le profil de l'utilisateur
const deleteUserProfile = async (req, res) => {
  const clientId = req.params.id;
  try {
    
    const sql = `DELETE FROM tblusers WHERE id = ?`;
    const [result] = await pool.execute(sql, [clientId]);

   
    if (result.affectedRows > 0) {
      res.status(200).json({ success: 'Profile deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found or profile deletion failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { register, login, getAllUsers, updateUserProfile, deleteUserProfile };






