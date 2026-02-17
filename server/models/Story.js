const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String },
    author: { type: String },
    date: { type: String },
    image: { type: String },
    category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Story', StorySchema);
