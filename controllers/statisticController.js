const User = require('../models/User');
const Company = require('../models/Company');
const Review = require('../models/Review');
const InterviewQuestion = require('../models/InterviewQuestion');

exports.getStatistics = async (req, res, next) => {
	try {
		const userCount = await User.countDocuments();
		const companyCount = await Company.countDocuments();
		const reviewCount = await Review.countDocuments();
		const questionCount = await InterviewQuestion.countDocuments();

		res.json({
			users: userCount,
			companies: companyCount,
			reviews: reviewCount,
			questions: questionCount,
		});
	} catch (err) {
		next(err);
	}
};
