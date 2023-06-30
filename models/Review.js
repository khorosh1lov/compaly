const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	// other properties...
});

module.exports = mongoose.model('Review', ReviewSchema);
