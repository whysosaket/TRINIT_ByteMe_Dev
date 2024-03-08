import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    languages: {type: Array, required: false}
});

export default mongoose.model('user', userSchema);