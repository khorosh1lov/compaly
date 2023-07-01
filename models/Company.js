const mongoose = require('mongoose');
const slugify = require('slugify');

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	webAddress: String,
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

CompanySchema.pre('save', function (next) {
	if (!this.slug) {
		this.slug = slugify(this.name, { lower: true, replacement: '-' });
	}
	next();
});

module.exports = mongoose.model('Company', CompanySchema);
