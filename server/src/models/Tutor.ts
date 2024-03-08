import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    languages: {type: Array, required: true},
    description: {type: String, required: false},
    rating: {type: Number, required: false, default: 0},
    experience: {type: Number, required: false, default: 0},
    averagePrice: {type: Number, required: false, default: 0},
});

export default mongoose.model('tutor', tutorSchema);