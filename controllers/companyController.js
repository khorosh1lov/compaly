const Company = require('../models/Company');

exports.getCompanies = async (req, res, next) => {
	try {
		const companies = await Company.find();
		res.json(companies);
	} catch (err) {
		next(err);
	}
};

exports.createCompany = async (req, res, next) => {
	try {
		const company = new Company(req.body);
		await company.save();
		res.status(201).json(company);
	} catch (err) {
		next(err);
	}
};
