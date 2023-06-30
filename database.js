const mongoose = require('mongoose');
const { DBConnectionError } = require('./errors/dbErrors');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected...');
	} catch (error) {
		throw new DBConnectionError('Error connecting to database');
	}
};

module.exports = connectDB;
