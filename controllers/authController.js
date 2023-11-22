const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const Medico = require('./../models/medicoModel');
const Paciente = require('./../models/pacienteModel');
const catchAsync = require('./../utils/catchAsync');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    data: {
      user: user,
    },
  });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('Você não está autorizado a acessar esse conteúdo', 403)
      );

    next();
  };
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError('Token não encontrado', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentMedico = await Medico.findById(decoded.id);

  if (!currentMedico) return next(new AppError('Médico não encontrado', 401));

  req.user = currentMedico;
  next();
});

exports.protectPaciente = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError('Token não encontrado', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentPaciente = await Paciente.findById(decoded.id);

  if (!currentPaciente) return next(new AppError('Médico não encontrado', 401));

  req.user = currentPaciente;
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { crm, password } = req.body;

  if (!crm || !password)
    return next(new AppError('Insira um CRM ou uma senha', 400));

  const medico = await Medico.findOne({ crm: crm }).select('+password');

  if (!medico || !(await medico.correctPassword(password, medico.password))) {
    return next(new AppError('Usuário ou senha incorretos', 401));
  }

  createSendToken(medico, 200, res);
});

exports.loginPaciente = catchAsync(async (req, res, next) => {
  const { cpf, password } = req.body;

  if (!cpf || !password)
    return next(new AppError('Insira um CPF ou uma senha', 400));

  const paciente = await Paciente.findOne({ cpf: cpf }).select('+password');

  if (
    !paciente ||
    !(await paciente.correctPassword(password, paciente.password))
  ) {
    return next(new AppError('Usuário ou senha incorretos', 401));
  }

  createSendToken(paciente, 200, res);
});
