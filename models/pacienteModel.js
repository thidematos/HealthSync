const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pacienteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Um paciente deve ter um nome'],
  },
  cpf: {
    type: String,
    required: [true, 'Um paciente deve ter um CPF'],
    unique: [true, 'O CPF do paciente é único'],
  },
  birth: {
    type: String,
    required: [true, 'Um paciente deve ter uma data de nascimento'],
  },
  gender: {
    type: String,
    required: [true, 'Um paciente deve ter um sexo'],
  },
  phone: {
    type: String,
    required: [true, 'Um paciente deve ter um telefone'],
  },
  email: {
    type: String,
    required: [true, 'Um paciente deve ter um email'],
  },
  address: {
    rua: {
      type: String,
      required: [true, 'Um endereço deve ter uma rua'],
    },
    bairro: {
      type: String,
      required: [true, 'Um endereço deve ter um bairro'],
    },
    numero: {
      type: Number,
      required: [true, 'Um endereço deve ter um número'],
    },
    cep: {
      type: String,
      required: [true, 'Um endereço deve ter um cep'],
    },
  },
  city: {
    type: String,
    required: [true, 'Um endereço deve ter uma cidade'],
  },
  state: {
    type: String,
    required: [true, 'Um endereço deve ter um estado'],
  },
  healthPlan: String,
  prontuarios: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Prontuario',
    },
  ],
  prescriptions: String,
  schedule: [
    {
      medicoId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Medico',
      },
      day: String,
      hour: String,
      reason: String,
      hasProntuario: {
        type: Boolean,
        default: false,
      },
    },
  ],
  password: {
    type: String,
    required: [true, 'Um paciente deve ter uma senha'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Um paciente deve ter uma confirmação de senha'],
    validate: {
      validator: function (field) {
        return field === this.password;
      },
    },
  },
  role: {
    type: String,
    default: 'paciente',
  },
  photo: String,
  age: Number,
});

pacienteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

pacienteSchema.post('save', async function () {
  this.password = undefined;
});

pacienteSchema.methods.correctPassword = async function (
  reqPassword,
  userPassword
) {
  return await bcrypt.compare(reqPassword, userPassword);
};

pacienteSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'schedule',
    populate: {
      path: 'medicoId',
      select: '-role -__v -disponibilidade -pacientes',
    },
  }).populate({
    path: 'prontuarios',
  });
  next();
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
