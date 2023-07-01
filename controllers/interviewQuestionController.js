const Question = require('../models/InterviewQuestion');
const Company = require('../models/Company');
const { NotFoundError } = require('../errors/httpErrors');

exports.getQuestions = async (req, res, next) => {
    try {
		const questions = await Question.find({ company: req.params.id });
		res.json(questions);
	} catch (err) {
		next(err);
	}
};

exports.createQuestion = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            throw new NotFoundError('Company not found');
        }

        const question = new Question({
            ...req.body,
            user: req.user.id,
            company: req.params.id,
        });
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        next(err);
    }
};

exports.editQuestion = async (req, res, next) => {
    try {
        let question = await Question.findById(req.params.id);
        if (!question) {
            throw new NotFoundError('Interview Question not found');
        }

        // обновление полей отзыва здесь...

        await question.save();
        res.json(question);
    } catch (err) {
        next(err);
    }
};

exports.getOneQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            throw new NotFoundError('Interview Question not found');
        }
        res.json(question);
    } catch (err) {
        next(err);
    }
};

exports.deleteQuestion = async (req, res, next) => {
    try {
        let question = await Question.findById(req.params.id);
        if (!question) {
			throw new NotFoundError('Interview Question not found');
		}

        await question.deleteOne();
        res.json(question);
    } catch (err) {
        next(err);
    }
};
