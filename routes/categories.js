const express = require('express');
const router = express.Router();
const { Category } = require('../models/Category');

router.get('/', async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.send(categoryList);
});

router.post('/', async (req, res) => {
    // Create a new category
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
        description: req.body.description,
    });
    category = await category.save(); // Save the category to the database

    if (!category) {
        return res.status(404).send('The category cannot be created!');
    }
    res.send(category);
});

// Delete a category
router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id)
        .then(category => {
            if (category) {
                return res.status(200).json({ success: true, message: 'The category is deleted!' });
            } else {
                return res.status(404).json({ success: false, message: 'Category not found!' });
            }
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err });
        });
});

// Modify a category
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
        description: req.body.description,
    }, { new: true });

    if (!category) {
        return res.status(400).send('The category cannot be updated!');
    }
    res.send(category);
});

module.exports = { router };
