const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String },
    image: { type: String },
    tag: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);
