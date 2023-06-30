const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../errors/httpErrors');

function auth(req, res, next) {
	const authHeader = req.header('Authorization');

	if (!authHeader) {
		throw new UnauthorizedError('No Authorization header, authorization denied');
	}

	const token = authHeader.replace('Bearer ', '');

	if (!token) {
		throw new UnauthorizedError('No token, authorization denied');
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.user;
		next();
	} catch (err) {
		throw new UnauthorizedError('Token is not valid');
	}
};

function checkRole(roles) {
	return function (req, res, next) {
		if (!roles.includes(req.user.role)) {
			throw new ForbiddenError(`Must be a ${roles} to perform this action`);
		}
		next();
	};
}

module.exports = {
	auth,
	checkRole
};