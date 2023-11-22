const mongoose = require('mongoose');

const prontuarioSchema = new mongoose.Schema({
  paciente: {
    type: String,
    required: [true, 'Um prontuário deve ter um paciente'],
  },
  healthPlan: String,
  medico: {
    type: String,
    required: [true, 'Um prontuário deve ter um médico responsável'],
  },
  date: {
    type: Date,
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
  treatment: [
    {
      recomendation: {
        type: String,
        required: [true, 'Uma recomendação é necessária'],
      },
      prescriptions: [
        {
          medicamento: String,
          dosagem: String,
          período: String,
        },
      ],
      followUp: {
        type: String,
        default: 'Retorno não é necessário',
      },
    },
  ],
  exams: [
    {
      name: String,
      results: String,
      default: 'Nenhum exame realizado',
    },
  ],
  observations: {
    type: String,
    default: 'Nenhuma consideração adicional.',
  },
});

const Prontuario = mongoose.model('Prontuario', prontuarioSchema);

module.exports = Prontuario;
