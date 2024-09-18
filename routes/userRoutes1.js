const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:userId', userController.getUser);

/**
 * @swagger
 * /user/{userId}:
 *   post:
 *     summary: Create or update user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: integer
 *       - in: body
 *         name: user
 *         required: true
 *         description: User data
 *         schema:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/:userId', userController.postUser);

module.exports = router;
