const Prontuario = require('./../models/prontuarioModel');
const catchAsync = require('./../utils/catchAsync');

exports.createProntuario = catchAsync(async (req, res, next) => {
  next();
});
