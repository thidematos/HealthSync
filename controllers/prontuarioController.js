const Prontuario = require('./../models/prontuarioModel');
const catchAsync = require('./../utils/catchAsync');

exports.createProntuario = catchAsync(async (req, res, next) => {
  const prontuario = await Prontuario.create(req.body);

  req.prontuario = prontuario;
  next();
});
