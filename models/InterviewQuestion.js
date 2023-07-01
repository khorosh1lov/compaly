const mongoose = require('mongoose');

const InterviewQuestionSchema = new mongoose.Schema({
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
	question: {
		type: String,
		required: true,
	},
	// other properties...
});

module.exports = mongoose.model('InterviewQuestion', InterviewQuestionSchema);
