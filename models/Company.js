const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	address: String,
	industry: String,
	// other properties...
});

module.exports = mongoose.model('Company', CompanySchema);
