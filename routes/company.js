const express = require('express');
const { getCompanies, createCompany } = require('../controllers/companyController');
const { auth, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /companies:
 *  get:
 *    tags:
 *      - Companies
 *    description: Use to get all companies
 *    responses:
 *      '200':
 *        description: A successful response with array of objects
 */
router.get('/', getCompanies);

/**
 * @swagger
 * definitions:
 *  Company:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      street:
 *        type: string
 *      industry:
 *        type: string
 */

/**
 * @swagger
 * /companies/create:
 *  post:
 *    tags:
 *      - Companies
 *    description: Use to create a new company
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: company
 *        in: body
 *        description: The company to create.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            name:
 *              type: string
 *            street:
 *              type: string
 *            industry:
 *              type: string
 *    responses:
 *      '201':
 *        description: A successful response with a new company object
 *        schema:
 *          $ref: '#/definitions/Company'
 */
router.post('/create', auth, checkRole(['admin', 'company']), createCompany);


module.exports = router;
