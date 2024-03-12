import { Request, Response } from 'express';
import { Blog, IBlog } from '../models/Blog';
import { Like } from '../models/likes';
import User from '../models/User';

interface AuthRequest extends Request {
    user?: { email: string; username: string };
}

export const likeBlog = async (req: AuthRequest, res: Response) => {
    try {
        
        const { id: blogId }= req.params;
        
        const email = req.user?.email;
        const user = await User.findOne({ email }); // find user by their email 
        
        // console.log(user);
        const userId = user;
        const username = req.user?.username;

        if (!userId || !username) {
            return res.status(400).json({ message: 'User not found' });
        }

        const existingLike = await Like.findOne({ user: userId, blog: blogId });
        if (existingLike) {
            return res.status(400).json({ message: 'You already liked this post' });
        }

        const newLike = new Like({ 
            user: userId,
            username,
            blog: blogId });
        await newLike.save();

        await Blog.findByIdAndUpdate(blogId, { $inc: { likesNo: 1 } });

        res.json({ message: 'Blog post liked successfully' });
    } catch (err) {
        console.error('Error liking blog post:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const unlikeBlog = async (req: AuthRequest, res: Response) => {
    try {
        const { id: blogId }= req.params;
        
        const email = req.user?.email;
        const user = await User.findOne({ email }); // find user by their email 
        
        console.log(user);
        const userId = user;
        // const username = req.user?.username;

        if (!userId) {
            return res.status(400).json({ message: 'User not found' });
        }

        await Like.findOneAndDelete({ user: userId, blog: blogId });

        await Blog.findByIdAndUpdate(blogId, { $inc: { likesNo: -1 } });

        res.json({ message: 'Blog post unliked successfully' });
    } catch (err) {
        console.error('Error unliking blog post:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getLikesForBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find all likes associated with the blog post ID
        const likes = await Like.find({ blog: id });

        // Extract usernames from the likes array
        const usernames: string[] = likes.map((like: any) => like.username);

        // Get the blog post to retrieve its likes count
        const blog: IBlog | null = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json({ likesNo: blog.likesNo, usernames });
    } catch (err) {
        console.error('Error getting likes:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};