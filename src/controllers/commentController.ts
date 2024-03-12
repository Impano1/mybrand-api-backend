import { Request, Response } from 'express';
import { Comment } from '../models/comment';
import { Blog } from '../models/Blog';


interface AuthRequest extends Request {
    user?: { id: string; username: string }; // Define the user property with proper typing
}

export const addComment = async (req: AuthRequest, res: Response) => {
    try {
        
        
        const { text } = req.body;
        const { id: blogId } = req.params; // Extract blogId from request parameters
        const username = req.user?.username; // Fetch username from req.user

        if (!text || !blogId || !username) { // Check if username exists
            return res.status(400).json({ message: 'Text field, blogId, and username are required' });
        }

        const comment = new Comment({
            text,
            user: username,
            blog: blogId,
        });

        await comment.save();

        await Blog.findByIdAndUpdate(blogId, { $inc: { commentsNo: 1 } });

        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




export const getCommentsForBlog = async (req: Request, res: Response) => {
    try {
        const { id: blogId } = req.params;

       

        const blog = await Blog.findById(blogId);
        if (!blog) {
            console.log('Blog not found for blogId:', blogId);
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comments = await Comment.find({ blog: blogId }).populate('user', 'username');
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this blog' });
        }

        res.json(comments);
    } catch (error) {
        console.error('Error retrieving blog comments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};










export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Update commentsCount in Blog model
        await Blog.findByIdAndUpdate(comment.blog, { $inc: { commentsCount: -1 } });

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};