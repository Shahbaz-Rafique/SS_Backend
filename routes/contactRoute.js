const express = require('express');
const { createContact } = require('../controllers/contactController');

const router = express.Router();

// POST route to handle lease submissions
router.post('/', createContact);

module.exports = router;