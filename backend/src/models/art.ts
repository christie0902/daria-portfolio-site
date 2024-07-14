import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const artSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['sketch-painting', 'digital', 'photography', 'sculpture'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        default: null
    },
    dimension: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const Art = mongoose.model('Art', artSchema);

export default Art;