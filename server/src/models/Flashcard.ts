import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
    class: {type: mongoose.Schema.Types.ObjectId, ref: 'class', required: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    scheduled: {type: mongoose.Schema.Types.ObjectId, ref: 'scheduled', required: false},
    question: {type: String, required: true},
    answer: {type: String, required: true},
});

export default mongoose.model('flashcard', flashcardSchema);