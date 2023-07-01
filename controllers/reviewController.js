const Review = require('../models/Review');
const Company = require('../models/Company');
const { NotFoundError } = require('../errors/httpErrors');

exports.getReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find({ company: req.params.id });
		res.json(reviews);
	} catch (err) {
		next(err);
	}
};

exports.createReview = async (req, res, next) => {
	try {
		const company = await Company.findById(req.params.id);
		if (!company) {
			throw new NotFoundError('Company not found');
		}

		const review = new Review({
			...req.body,
			user: req.user.id,
			company: req.params.id,
		});
		await review.save();
		res.status(201).json(review);
	} catch (err) {
		next(err);
	}
};

exports.editReview = async (req, res, next) => {
	try {
		let review = await Review.findById(req.params.id);
		if (!review) {
			throw new NotFoundError('Review not found');
		}

		// TODO: Update Review fields

		await review.save();
		res.json(review);
	} catch (err) {
		next(err);
	}
};

exports.getOneReview = async (req, res, next) => {
	try {
		const review = await Review.findById(req.params.id);
		if (!review) {
			throw new NotFoundError('Review not found');
		}
		res.json(review);
	} catch (err) {
		next(err);
	}
};

exports.deleteReview = async (req, res, next) => {
	try {
		let review = await Review.findById(req.params.id);
		if (!review) {
			throw new NotFoundError('Review not found');
		}

		await review.deleteOne();
		res.json(review);
	} catch (err) {
		next(err);
	}
};
