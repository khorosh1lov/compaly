const express = require('express');
const { getCompanies, createCompany, getOneCompany, deleteCompany, editCompany } = require('../controllers/companyController');
const { getReviews, createReview } = require('../controllers/reviewController');
const { getQuestions, createQuestion } = require('../controllers/interviewQuestionController');
const { auth, checkRole } = require('../middleware/auth');

const router = express.Router();

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

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     tags:
 *       - Companies
 *     description: Returns a single company
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A company object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Company'
 */
router.get('/:slug', getOneCompany);

/**
 * @swagger
 * /companies/{id}/edit:
 *   put:
 *     tags:
 *       - Companies
 *     description: Updates a single company
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Company'
 *     responses:
 *       200:
 *         description: The updated company object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Company'
 */
router.put('/:id/edit', auth, checkRole(['admin', 'company']), editCompany);

/**
 * @swagger
 * /companies/{id}/delete:
 *   delete:
 *     tags:
 *       - Companies
 *     description: Deletes a single company
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted company object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Company'
 */
router.delete('/:id/delete', auth, checkRole(['admin', 'company']), deleteCompany);

router.get('/:id/reviews', getReviews);

router.post('/:id/reviews', auth, checkRole(['admin', 'user']), createReview);

router.get('/:id/interview-questions', getQuestions);

router.post('/:id/interview-questions', auth, checkRole(['admin', 'user']), createQuestion);

module.exports = router;
