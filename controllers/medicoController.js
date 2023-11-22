const Medico = require('./../models/medicoModel');
const catchAsync = require('./../utils/catchAsync');
const Features = require('./../utils/features');

exports.createMedico = catchAsync(async (req, res, next) => {
  const {
    name,
    crm,
    speciality,
    phone,
    photo,
    email,
    city,
    state,
    password,
    passwordConfirm,
  } = req.body;

  const newDoctor = await Medico.create({
    name,
    crm,
    speciality,
    phone,
    photo,
    email,
    city,
    state,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: 'sucess',
    data: {
      doctor: newDoctor,
    },
  });
});

exports.getAllMedicos = async (req, res, next) => {
  const doctorsQuery = Medico.find({});

  const features = new Features(doctorsQuery, req.query).limitFields().filter();

  const doctors = await features.query;

  res.status(200).json({
    status: 'sucess',
    results: doctors.length,
    data: {
      doctor: doctors,
    },
  });
};

exports.getMedicosHasChat = catchAsync(async (req, res, next) => {
  const ids = req.user.hasChatWith;

  const queryMedicos = ids.map((id) => Medico.findById(id));

  const hasChatWith = await Promise.all(queryMedicos);

  req.user.hasChatWith = hasChatWith;

  next();
});

exports.getMedico = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const medico = await Medico.findById(id);

  req.currentMedico = medico;

  next();
});
