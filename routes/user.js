const express = require('express');
const { registerUser, loginUser, editUser, deleteUser, getCurrentUser } = require('../controllers/userController.js');
const { auth } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       role:
 *         type: string
 *     required:
 *       - username
 *       - email
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *    tags:
 *      - Users
 *    description: Register a new user
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        description: The user to create
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - email
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Successfully registered
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /user/login:
 *  post:
 *    tags:
 *      - Users
 *    description: Log in a user
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        description: The user's login information
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Successfully logged in
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    tags:
 *      - Users
 *    description: Update a user
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *      - in: body
 *        name: body
 *        description: The user's updated information
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *    responses:
 *      '200':
 *        description: Successfully updated
 *        schema:
 *          $ref: '#/definitions/User'
 */
router.put('/:id', auth, editUser);

/**
 * @swagger
 * /user/{id}/delete:
 *  delete:
 *    tags:
 *      - Users
 *    description: Delete a user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Successfully deleted
 */
router.delete('/:id/delete', auth, deleteUser);

/**
 * @swagger
 * /user/me:
 *  get:
 *    tags:
 *      - Users
 *    description: Get the current user
 *    responses:
 *      '200':
 *        description: Successfully got the user
 *        schema:
 *          $ref: '#/definitions/User'
 */
router.get('/me', auth, getCurrentUser);

module.exports = router;
