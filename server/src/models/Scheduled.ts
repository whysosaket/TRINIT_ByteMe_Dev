import mongoose from 'mongoose';

const scheduledSchema = new mongoose.Schema({
    class: {type: mongoose.Schema.Types.ObjectId, ref: 'class', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    duration: {type: Number, required: true},
    price: {type: Number, required: true},
    date: {type: Date, required: true},
    status: {type: String, required: true, enum: ['pending', 'approved', 'rejected'], default: 'pending'},
    tutorFeedback: {type: String, required: false},
    studentFeedback: {type: String, required: false},
});

export default mongoose.model('scheduled', scheduledSchema);