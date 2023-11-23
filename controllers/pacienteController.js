const multer = require('multer');
const sharp = require('sharp');
const Paciente = require('./../models/pacienteModel');
const catchAsync = require('./../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image'))
    //cb(new AppError('Not an image! Please, upload only images', 400), false);
    cb(null, true);
};

exports.uploader = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.resizeImage = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `photo-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/uploads/${req.file.filename}`);

  next();
};

exports.createPaciente = catchAsync(async (req, res, next) => {
  const data = req.body;

  const newPaciente = await Paciente.create(data);

  res.status(201).json({
    status: 'sucess',
    data: {
      paciente: newPaciente,
    },
  });
});

exports.schedule = catchAsync(async (req, res, next) => {
  const { pacienteId, day, hour, reason } = req.body;

  const paciente = await Paciente.findById(pacienteId);
  console.log(paciente);

  paciente.schedule.push({
    medicoId: req.params.id,
    day: day,
    hour: hour,
    reason: reason,
  });

  const updatedPaciente = await paciente.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'sucess',
    data: {
      paciente: updatedPaciente,
    },
  });
});

exports.getAllPacientes = async (req, res, next) => {
  const pacientes = await Paciente.find({});

  res.status(200).json({
    status: 'sucess',
    data: {
      pacientes,
    },
  });
};

exports.getHistorical = catchAsync(async (req, res, next) => {
  const paciente = await Paciente.findById(req.params.id);

  req.paciente = paciente;

  next();
});

exports.postProntuario = catchAsync(async (req, res, next) => {
  const paciente = await Paciente.findById(req.body.paciente);

  paciente.prontuarios.push(req.prontuario);

  paciente.save({ validateModifiedOnly: true });

  res.status(201).json({
    status: 'sucess',
    data: {
      prontuario: req.prontuario,
    },
  });
});
