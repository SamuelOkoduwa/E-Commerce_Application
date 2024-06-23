const express = require('express');
const router = express.Router();
const { Category } = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json({ success: true, categoryList });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get a single category
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found!' });
        }
        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
            description: req.body.description,
        });
        category = await category.save();

        res.status(201).json({ success: true, category });
    } catch (error) {
        res.status(400).json({ success: false, message: 'The category cannot be created!', error: error.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category) {
            return res.status(200).json({ success: true, message: 'The category is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'Category not found!' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Modify a category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color,
                description: req.body.description,
            },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ success: false, message: 'The category cannot be updated!' });
        }
        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
