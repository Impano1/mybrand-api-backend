import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    name: string;
    email: string;
    message: string;
}

const MessageSchema = new Schema({
    name: String,
    email: String,
    message: String
});

export default model<IMessage>('Message', MessageSchema);
