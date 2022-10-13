require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { StatusCodes: status } = require('http-status-codes');
const routes = require('./routes');
const { apiResponse } = require('./utils/apiResponse.utils');

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/', (req, res) => res.status(status.OK).json(
    apiResponse(status.OK, 'OK', 'Welcome to the initial Express API Structure.'),
));

app.use((req, res) => res.status(status.NOT_FOUND).json(
    apiResponse(status.NOT_FOUND, 'NOT_FOUND', 'The requested resource could not be found.'),
));

app.use((err, req, res, next) => res.status(status.INTERNAL_SERVER_ERROR).json(
    apiResponse(status.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', err.message),
));

app.listen(port, () => {
    console.info(`Server is running on port ${port}, http://localhost:${port}`);
});
