const { pool } = require('../services/Connexion');
const moment = require('moment');

const createRental = async (req, res) => {
  const { client_id, utilitaire_id, date_debut, date_fin, equipements_loues, prix_total, promotion_id } = req.body;

  // Vérification des données requises
  if (!client_id || !utilitaire_id || !date_debut || !date_fin || !prix_total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Vérification de la disponibilité du véhicule
    const availabilityQuery = `
      SELECT * FROM location 
      WHERE utilitaire_id = ? 
      AND (
        (date_debut BETWEEN ? AND ?) 
        OR (date_fin BETWEEN ? AND ?)
      )`;
    const availabilityValues = [utilitaire_id, date_debut, date_fin, date_debut, date_fin];
    const [existingRental] = await pool.query(availabilityQuery, availabilityValues);

    if (existingRental.length > 0) {
      return res.status(400).json({ error: 'Vehicle already booked for this period' });
    }

    // Création de la location
    const createQuery = `
      INSERT INTO location (client_id, utilitaire_id, date_debut, date_fin, equipements_loues, prix_total, promotion_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const createValues = [client_id, utilitaire_id, date_debut, date_fin, equipements_loues, prix_total, promotion_id];
    await pool.query(createQuery, createValues);

    res.status(201).json({ success: 'Rental created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllRentalHistory = async (req, res) => {
  try {
    const rentals = await pool.query('SELECT * FROM location');
    res.status(200).json(rentals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getRentalHistoryForClient = async (req, res) => {
  const client_id = req.params.client_id;
  try {
    const rentals = await pool.query('SELECT * FROM location WHERE client_id = ?', [client_id]);
    res.status(200).json(rentals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createRental, getAllRentalHistory, getRentalHistoryForClient };
