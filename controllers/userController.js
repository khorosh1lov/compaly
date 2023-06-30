const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { 
	HttpError, 
	BadRequestError, 
	InternalServerError, 
	ForbiddenError, 
	NotFoundError 
} = require('../errors/httpErrors');

exports.registerUser = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		let user = await User.findOne({ username });

		if (user) {
			throw new BadRequestError('User already exists');
		}

		user = new User({
			username,
			email,
			password,
		});

		await user.save();

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: 3600,
			},
			(err, token) => {
				if (err) {
					next(new InternalServerError('An error occurred during token generation.'));
				} else {
					res.json({ token });
				}
			},
		);
	} catch (err) {
		if (err instanceof HttpError) {
			next(err);
		} else {
			next(new InternalServerError('An unexpected error occurred.'));
		}
	}
};

exports.loginUser = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		let user = await User.findOne({ username });
		if (!user) {
			throw new BadRequestError('Invalid Credentials');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new BadRequestError('Invalid Credentials');
		}

		const payload = { user: { id: user.id, role: user.role } };
		
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (err) {
		if (err instanceof HttpError) {
			next(err);
		} else {
			next(new InternalServerError('An unexpected error occurred.'));
		}
	}
};

exports.editUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		throw new ForbiddenError('You are not authorized to edit this profile');
	}
	
	const { username, email } = req.body;
	try {
		let user = await User.findById(req.params.id);
		if (!user) {
			throw new NotFoundError('User not found');
		}

		if (username) user.username = username;
		if (email) user.email = email;

		await user.save();

		res.json(user);
	} catch (err) {
		if (err instanceof HttpError) {
			next(err);
		} else {
			next(new InternalServerError('An unexpected error occurred.'));
		}
	}
};

exports.deleteUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		throw new ForbiddenError('You are not authorized to edit this profile');
	}

	try {
		let user = await User.findById(req.params.id);
		if (!user) {
			throw new NotFoundError('User not found');
		}

		if (username) user.username = username;
		if (email) user.email = email;

		await user.de();

		res.json(user);
	} catch (err) {
		if (err instanceof HttpError) {
			next(err);
		} else {
			next(new InternalServerError('An unexpected error occurred.'));
		}
	}
};

exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        if (err instanceof HttpError) {
			next(err);
		} else {
			next(new InternalServerError('An unexpected error occurred.'));
		}
    }
};
