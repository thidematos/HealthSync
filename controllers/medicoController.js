const Medico = require('./../models/medicoModel');
const catchAsync = require('./../utils/catchAsync');
const Features = require('./../utils/features');
const Paciente = require('./../models/pacienteModel');

exports.createMedico = catchAsync(async (req, res, next) => {
  const newDoctor = await Medico.create(req.body);

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
  const queryPacientes = ids.map((id) => Paciente.findById(id));

  const hasChatWith = (await Promise.all(queryMedicos)).filter((result) => {
    if (result) return result;
  });

  const hasChatWithPaciente = (await Promise.all(queryPacientes)).filter(
    (result) => {
      if (result) return result;
    }
  );

  const chats = hasChatWith.concat(hasChatWithPaciente);

  req.user.hasChatWith = chats;

  next();
});

exports.getMedico = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const medico = await Medico.findById(id);

  req.currentMedico = medico;

  next();
});

exports.deleteAll = async (req, res, next) => {
  const ids = await Medico.find({}).select('_id');
  ids.forEach(async (id) => {
    await Medico.findByIdAndDelete(id);
  });
  res.status(204).json({ status: 'ok' });
};

exports.schedule = catchAsync(async (req, res, next) => {
  const { pacienteId, day, hour, reason } = req.body;

  const doctor = await Medico.findById(req.params.id);
  console.log(doctor);
  doctor.pacientes.push({ pacienteId, day, hour, reason });

  await doctor.save({ validateModifiedOnly: true });

  next();
});
