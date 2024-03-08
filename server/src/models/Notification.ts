import mongoose from 'mongoose';

const scheduledSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false},
    tutor: {type: mongoose.Schema.Types.ObjectId, ref: 'tutor', required: false},
    date: {type: Date, required: true},
    message: {type: String, required: true},
    seen: {type: Boolean, default: false},
});

export default mongoose.model('scheduled', scheduledSchema);