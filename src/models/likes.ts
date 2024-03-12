import mongoose, { Schema, Model, Document } from 'mongoose';

interface ILike extends Document {
    user: mongoose.Types.ObjectId;
    username: string; // Add username field
    blog: mongoose.Types.ObjectId;
}

const LikeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true }, // Store the username along with userId
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true }
});

const Like: Model<ILike> = mongoose.model<ILike>('Like', LikeSchema);

export {ILike,Like};
