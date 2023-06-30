const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
require('dotenv').config();
const { NotFoundError } = require('./errors/httpErrors');

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');

// Use Routes
app.use('/user', userRoutes);
app.use('/companies', companyRoutes);
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use((req, res, next) => {
	next(new NotFoundError('Page not found'));
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.statusCode || 500);
	res.json({
		message: err.message,
		error: err,
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
