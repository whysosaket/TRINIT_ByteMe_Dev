import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    tutor: {type: mongoose.Schema.Types.ObjectId, ref: 'tutor', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Array, required: true},
    rating: {type: Number, required: false, default: 0},
    language: {type: String, required: true},
    duration: {type: Array, required: true},
});

export default mongoose.model('class', classSchema);