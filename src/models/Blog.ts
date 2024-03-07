import { Schema, model, Document } from 'mongoose';

interface IBlog extends Document {
        title: string;
        description: string;
        likesCount: number; // Likes count
        likes: string[]; // Array of user identifiers who liked the post
        comments: Array<{ text: string; user: string }>;
}

const BlogSchema = new Schema({
    title: String,
    description: String,
    likesCount: { type: Number, default: 0 }, // Likes count
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user identifiers who liked the post
    comments: [{ text: String, user: { type: Schema.Types.ObjectId, ref: 'User' } }],
});

export default model<IBlog>('Blog', BlogSchema);
