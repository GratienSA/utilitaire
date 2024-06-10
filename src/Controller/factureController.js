const { pool } = require('../services/Connexion');

const createInvoice = async (req, res) => {
  const { client_id, utilitaire_id, date_debut, date_fin, montant_total, statut } = req.body;

  // Vérification des données requises
  if (!client_id || !utilitaire_id || !date_debut || !date_fin || !montant_total || !statut) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Création de la facture
    const createQuery = `
      INSERT INTO facture (client_id, utilitaire_id, date_debut, date_fin, montant_total, statut) 
      VALUES (?, ?, ?, ?, ?, ?)`;
    const createValues = [client_id, utilitaire_id, date_debut, date_fin, montant_total, statut];
    await pool.query(createQuery, createValues);

    res.status(201).json({ success: 'Invoice created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const cancelInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    // Suppression de la facture
    const deleteQuery = `DELETE FROM facture WHERE facture_id = ?`;
    const deleteValues = [id];
    const [result] = await pool.query(deleteQuery, deleteValues);

    if (result.affectedRows > 0) {
      res.status(200).json({ success: 'Invoice canceled successfully' });
    } else {
      res.status(404).json({ error: 'Invoice not found or already canceled' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createInvoice, cancelInvoice };
