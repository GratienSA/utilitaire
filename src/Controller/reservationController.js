const { pool } = require('../services/Connexion');
const moment = require('moment');

// Contrôleur pour gérer les réservations de véhicules
const createReservation = async (req, res) => {
  const { client_id, utilitaire_id, date_debut, date_fin } = req.body;

  // Vérifier si les champs nécessaires sont présents dans la requête
  if (!client_id || !utilitaire_id || !date_debut || !date_fin) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Vérifier la disponibilité du véhicule pour les dates spécifiées
    const [existingReservation] = await pool.query(
      'SELECT * FROM reservation WHERE utilitaire_id = ? AND ((date_debut BETWEEN ? AND ?) OR (date_fin BETWEEN ? AND ?))',
      [utilitaire_id, date_debut, date_fin, date_debut, date_fin]
    );

    if (existingReservation.length > 0) {
      return res.status(400).json({ error: 'Vehicle already reserved for the specified dates' });
    }

    // Insérer la nouvelle réservation dans la base de données
    await pool.query(
      'INSERT INTO reservation (client_id, utilitaire_id, date_debut, date_fin) VALUES (?, ?, ?, ?)',
      [client_id, utilitaire_id, date_debut, date_fin]
    );

    // Envoyer une réponse de succès
    res.status(201).json({ success: 'Reservation created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Contrôleur pour annuler une réservation existante
const cancelReservation = async (req, res) => {
  const reservation_id = req.params.id; // Récupérer l'ID de la réservation à annuler

  try {
    // Supprimer la réservation de la base de données
    await pool.query('DELETE FROM reservation WHERE reservation_id = ?', [reservation_id]);

    // Envoyer une réponse de succès
    res.status(200).json({ success: 'Reservation canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Contrôleur pour récupérer les réservations d'un client spécifique
const getClientReservations = async (req, res) => {
  const client_id = req.params.id; // Récupérer l'ID du client

  try {
    // Récupérer les réservations associées au client spécifié
    const [reservations] = await pool.query('SELECT * FROM reservation WHERE client_id = ?', [client_id]);

    // Envoyer les réservations en réponse
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createReservation, cancelReservation, getClientReservations };
