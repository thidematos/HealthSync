const Medico = require('./../models/medicoModel');
const Paciente = require('./../models/pacienteModel');
const catchAsync = require('./../utils/catchAsync');

exports.chatWith = catchAsync(async (req, res, next) => {
  const chattingWith = req.params.id;

  const chatWithDoctor = await Medico.findById(chattingWith);
  const chatWithPaciente = await Paciente.findById(chattingWith);

  res.locals.chatsWith = chatWithDoctor || chatWithPaciente;

  next();
});
