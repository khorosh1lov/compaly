const express = require('express');
const { getAllBookmarks, createBookmark, deleteBookmark } = require('../controllers/bookmarkController');
const { auth } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Bookmarks
 *     description: Get all bookmarks of the current user
 *     responses:
 *       200:
 *         description: An array of bookmark objects
 */

router.get('/', auth, getAllBookmarks);

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Bookmarks
 *     description: Create a new bookmark for the current user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: company
 *         description: The ID of the company to bookmark
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: The newly created bookmark object
 */
router.post('/', auth, createBookmark);

/**
 * @swagger
 * /bookmarks/{id}/delete:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Bookmarks
 *     description: Delete a bookmark by ID
 *     parameters:
 *       - name: id
 *         description: The ID of the bookmark to delete
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A message indicating the bookmark was successfully deleted
 */
router.delete('/:id/delete', auth, deleteBookmark);

module.exports = router;