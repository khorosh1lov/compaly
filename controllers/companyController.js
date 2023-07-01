const Company = require('../models/Company');
const { HttpError, InternalServerError, NotFoundError } = require('../errors/httpErrors');

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

exports.editCompany = async (req, res, next) => {
	const { name, address, industry } = req.body;

	try {
		let company = await Company.findById(req.params.id);
		if (!company) {
			throw new NotFoundError('Company not found');
		}

		if (name) company.name = name;
		if (address) company.address = address;
		if (industry) company.industry = industry;

		await company.save();

		res.json(company);
	} catch (err) {
		if (err instanceof HttpError) {
			next(err);
		} else {
			next(new InternalServerError('An unexpected error occurred.'));
		}
	}
};

exports.getOneCompany = async (req, res, next) => {
	try {
		const company = await Company.findById(req.params.id);
		res.json(company);
	} catch (err) {
		if (err instanceof HttpError) {
			next(err);
		} else {
			next(new InternalServerError('An unexpected error occurred.'));
		}
	}
};

exports.deleteCompany = async (req, res, next) => {
	try {
		let company = await Company.findById(req.params.id);
		if (!company) {
			throw new NotFoundError('Company not found');
		}

		await company.deleteOne();

		res.json(company);
	} catch (err) {
		if (err instanceof HttpError) {
			next(err);
		} else {
			next(new InternalServerError('An unexpected error occurred.'));
		}
	}
};