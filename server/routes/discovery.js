const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const Gallery = require('../models/Gallery');

// ==================== STORIES ====================

// GET all stories
router.get('/stories', async (req, res) => {
    try {
        const stories = await Story.find().sort({ id: -1 });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// GET single story
router.get('/stories/:id', async (req, res) => {
    try {
        const story = await Story.findOne({ id: parseInt(req.params.id) });
        if (!story) return res.status(404).json({ msg: 'Story not found' });
        res.json(story);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// POST create story
router.post('/stories', async (req, res) => {
    try {
        const { title, excerpt, content, author, date, image, category } = req.body;
        // Auto-increment ID
        const last = await Story.findOne().sort({ id: -1 });
        const newId = last ? last.id + 1 : 1;

        const story = new Story({ id: newId, title, excerpt, content, author, date, image, category });
        await story.save();
        res.status(201).json(story);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// PUT update story
router.put('/stories/:id', async (req, res) => {
    try {
        const story = await Story.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { $set: req.body },
            { new: true }
        );
        if (!story) return res.status(404).json({ msg: 'Story not found' });
        res.json(story);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// DELETE story
router.delete('/stories/:id', async (req, res) => {
    try {
        const story = await Story.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!story) return res.status(404).json({ msg: 'Story not found' });
        res.json({ msg: 'Story deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// ==================== GALLERY ====================

// GET all gallery items
router.get('/gallery', async (req, res) => {
    try {
        const items = await Gallery.find().sort({ id: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// POST create gallery item
router.post('/gallery', async (req, res) => {
    try {
        const { name, location, image, tag } = req.body;
        const last = await Gallery.findOne().sort({ id: -1 });
        const newId = last ? last.id + 1 : 1;

        const item = new Gallery({ id: newId, name, location, image, tag });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// PUT update gallery item
router.put('/gallery/:id', async (req, res) => {
    try {
        const item = await Gallery.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { $set: req.body },
            { new: true }
        );
        if (!item) return res.status(404).json({ msg: 'Gallery item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// DELETE gallery item
router.delete('/gallery/:id', async (req, res) => {
    try {
        const item = await Gallery.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!item) return res.status(404).json({ msg: 'Gallery item not found' });
        res.json({ msg: 'Gallery item deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;
