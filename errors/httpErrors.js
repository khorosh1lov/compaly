class HttpError extends Error {
	constructor(statusCode, errorCode, message) {
		super(message);
		this.statusCode = statusCode;
		this.errorCode = errorCode;
	}
}

class BadRequestError extends HttpError {
	constructor(message = 'Bad Request') {
		super(400, 'BAD_REQUEST', message);
	}
}

class UnauthorizedError extends HttpError {
	constructor(message = 'Unauthorized') {
		super(401, 'UNAUTHORIZED', message);
	}
}

class ForbiddenError extends HttpError {
	constructor(message = 'Forbidden') {
		super(403, 'FORBIDDEN', message);
	}
}

class NotFoundError extends HttpError {
	constructor(message = 'Not found') {
		super(404, 'NOT_FOUND', message);
	}
}

class InternalServerError extends HttpError {
	constructor(message = 'Internal Server Error') {
		super(500, 'INTERNAL_SERVER_ERROR', message);
	}
}

module.exports = {
	HttpError,
	NotFoundError,
	ForbiddenError,
	BadRequestError,
	UnauthorizedError,
	InternalServerError,
};
