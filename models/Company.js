const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	address: String,
	industry: String,
	logo: {
		type: String,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	// other properties...
});

module.exports = mongoose.model('Company', CompanySchema);
