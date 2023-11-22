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
