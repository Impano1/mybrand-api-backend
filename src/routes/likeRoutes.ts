import express from 'express';
import { likeBlog, getLikesForBlog, unlikeBlog} from '../controllers/likeController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like operations
 */

/**
 * @swagger
 * /likes/{id}:
 *   post:
 *     summary: Like a blog
 *     description: Like a specific blog by its ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog to like
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blog liked successfully
 *       401:
 *         description: Unauthorized - user not authenticated
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */  




router.post('/:id', authenticateToken, likeBlog);

/**
 * @swagger
 * /likes/{id}:
 *   get:
 *     summary: Get likes for a blog
 *     description: Retrieve the number of likes for a specific blog by its ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog to get likes for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Number of likes retrieved successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getLikesForBlog);

router.post('/unlike/:id', unlikeBlog);

export default router;
