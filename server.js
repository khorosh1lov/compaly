const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const { NotFoundError } = require('./errors/httpErrors');

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Routes
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');
const bookmarkRoutes = require('./routes/bookmark');

// Use Routes
app.use('/user', userRoutes);
app.use('/companies', companyRoutes);
app.use('/bookmark', bookmarkRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to our Copal API',
		version: 'v1',
		docsUrl: `${process.env.BASE_URL}:${process.env.PORT}/api-docs`,
	});
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
