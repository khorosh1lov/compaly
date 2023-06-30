const mongoose = require('mongoose');

const InterviewQuestionSchema = new mongoose.Schema({
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
