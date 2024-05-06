const mongoose = require('mongoose');
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
    }
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;