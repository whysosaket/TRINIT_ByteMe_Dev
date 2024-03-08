import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
    class: {type: mongoose.Schema.Types.ObjectId, ref: 'class', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    scheduled: {type: mongoose.Schema.Types.ObjectId, ref: 'scheduled', required: true},
    content: {type: Array, required: false}
});

export default mongoose.model('flashcard', flashcardSchema);