import { Request, Response } from 'express';
import Blog from '../models/Blog';
import { blogSchema } from '../utils/validation';


export const createBlog = async (req: Request, res: Response) => {
    try {
        const { error } = blogSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, description} = req.body;
        const newBlog = new Blog({
            title,
            description
        });
        await newBlog.save();

        res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single blog post by ID

export const getSingleBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update a blog post by ID
export const updateBlog = async (req: Request, res: Response) => {
    try {
        // Validate request payload
        const { error } = blogSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, description } = req.body;
        const updatedFields: any = { title, description };

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json({ message: 'Blog post updated successfully', blog: updatedBlog });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a blog post by ID
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json({ message: 'Blog post deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

