const Medico = require('./../models/medicoModel');
const catchAsync = require('./../utils/catchAsync');

exports.chatWith = catchAsync(async (req, res, next) => {
  const chattingWith = req.params.id;

  const chatWithDoctor = await Medico.findById(chattingWith);

  res.locals.chatsWith = chatWithDoctor;

  next();
});
