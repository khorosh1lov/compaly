const Review = require('../models/Review');
const { NotFoundError } = require('../errors/httpErrors');

exports.editReview = async (req, res, next) => {
	try {
		let review = await Review.findById(req.params.id);
		if (!review) {
			throw new NotFoundError('Review not found');
		}

		// обновление полей отзыва здесь...
        
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
