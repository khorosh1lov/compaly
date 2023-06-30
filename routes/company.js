const express = require('express');
const { getCompanies, createCompany } = require('../controllers/companyController');
const { auth, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /companies:
 *  get:
 *    description: Use to get all companies
 *    responses:
 *      '200':
 *        description: A successful response with array of objects
 */
router.get('/', getCompanies);
router.post('/create', auth, checkRole(['admin', 'company']), createCompany);

module.exports = router;
