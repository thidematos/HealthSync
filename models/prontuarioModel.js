const mongoose = require('mongoose');
const { prontuario } = require('../controllers/viewController');

const prontuarioSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.ObjectId,
    ref: 'Paciente',
    required: [true, 'Um prontuário deve ter um paciente'],
  },
  cod: {
    type: mongoose.Schema.ObjectId,
    ref: 'Medico',
  },
  healthPlan: String,
  medico: {
    type: mongoose.Schema.ObjectId,
    ref: 'Medico',
    required: [true, 'Um prontuário deve ter um médico responsável'],
  },
  date: {
    type: String,
    required: [true, 'Um prontuário deve ter uma data'],
  },
  anamnese: [
    {
      reports: {
        type: String,
        required: [true, 'Uma anamnese deve ter, pelo menos, uma queixa'],
      },
      timeSinceStarted: {
        type: String,
        required: [
          true,
          'O tempo desde que começou a sentir os sintomas é necessário',
        ],
      },
    },
  ],
  diagnosis: [
    {
      main: {
        type: String,
        required: [true, 'É necessário um diagnóstico principal'],
      },
    },
  ],
  treatment: {
    recomendation: {
      type: String,
      required: [true, 'Uma recomendação é necessária'],
    },
    prescriptions: [
      {
        medicamento: String,
        dosagem: String,
        periodo: String,
      },
    ],
  },
  exams: [
    {
      name: {
        type: String,
        default: 'Não se aplica',
      },
      results: {
        type: String,
        default: 'Não se aplica',
      },
    },
  ],
  observations: {
    type: String,
    default: 'Nenhuma consideração adicional.',
  },
});

prontuarioSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'medico',
    select: '-role -__v -disponibilidade -pacientes',
  });
  next();
});

const Prontuario = mongoose.model('Prontuario', prontuarioSchema);

module.exports = Prontuario;
