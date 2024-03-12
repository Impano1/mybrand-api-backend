import mongoose, { Schema, Model, Document } from 'mongoose';

interface IComment extends Document {
    text: string;
    user: string;
    blog: mongoose.Types.ObjectId;
}

const CommentSchema = new Schema({
    text: { type: String, required: true },
    user: { type: String, required: true }, 
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true }
});

const Comment: Model<IComment> = mongoose.model<IComment>('Comment', CommentSchema);

export { IComment, Comment };
