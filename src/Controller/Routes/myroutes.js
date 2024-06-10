const express = require('express');
const router = express.Router();



const { createInvoice, cancelInvoice} = require('../factureController');
// const { verifData } = require('../../Utils/middlewares');

router.post('/facture/create', createInvoice);
// Route pour annuler une facture
router.delete('/facture/:id/annuler',cancelInvoice );

module.exports = router;
