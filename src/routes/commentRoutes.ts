import express from 'express';
import { addComment, getCommentsForBlog } from '../controllers/commentController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment operations
 */

/**
 * @swagger
 * /comments/{id}:
 *   post:
 *     summary: Add a comment to a blog post
 *     tags: [Comments]
 *     description: Add a comment to a specific blog post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog post to comment on
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Text field, blogId, and username are required
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

router.post('/:id',authenticateToken, addComment);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comments for a blog post
 *     tags: [Comments]
 *     description: Retrieve comments for a specific blog post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog post to get comments for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       404:
 *         description: Blog not found or no comments found for this blog
 *       500:
 *         description: Internal server error
 */
router.get('/:id',authenticateToken, getCommentsForBlog);

export default router;
