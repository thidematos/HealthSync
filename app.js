const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const path = require('path');

const medicoRouter = require('./routers/medicoRouter');
const pacienteRouter = require('./routers/pacienteRouter');
const prontuarioRouter = require('./routers/prontuarioRouter');
const viewRouter = require('./routers/viewRouter');

const errController = require('./controllers/errController');
const AppError = require('./utils/appError');

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter);
app.use('/api/medicos', medicoRouter);
app.use('/api/pacientes', pacienteRouter);
app.use('/api/prontuario', prontuarioRouter);

app.all('*', (req, res, next) => {
  next(new AppError('URL não encontrada!', 400));
});

app.use(errController.globalErrHandler);

module.exports = app;
