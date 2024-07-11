const express = require('express');
const { createLease ,getLeases} = require('../controllers/leaseController');

const router = express.Router();

// POST route to handle lease submissions
router.post('/', createLease);

// GET route to fetch all leases
router.get('/', getLeases);
module.exports = router;