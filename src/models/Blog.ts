import mongoose, { Schema, Model, Document } from 'mongoose';


interface IBlog extends Document {
    title: string;
    description: string;
    image: string;
    likesNo: number;
    commentsNo: number;
     
}

const BlogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: String, required: true},
    likesNo: { type: Number, default: 0, required: true },    
    commentsNo: { type: Number, default: 0, required: true } ,
   
});

const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema);

export { IBlog, Blog };
