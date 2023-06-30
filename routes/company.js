const express = require('express');
const { getCompanies, createCompany } = require('../controllers/companyController');
const { auth, checkRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCompanies);
router.post('/create', auth, checkRole(['admin', 'company']), createCompany);

module.exports = router;
