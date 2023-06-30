class DatabaseError extends Error {
	constructor(statusCode, errorCode, message) {
		super(message);
		this.statusCode = statusCode;
		this.errorCode = errorCode;
	}
}

class DBConnectionError extends DatabaseError {
	constructor(message = 'Connection error') {
		super(500, 'DATABASE_CONNECTION_ERROR', message);
	}
}

module.exports = {
	DatabaseError,
	DBConnectionError,
};
