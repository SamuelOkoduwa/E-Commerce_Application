const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
	},
	color: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {CategorySchema, Category};