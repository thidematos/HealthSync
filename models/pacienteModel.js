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
  historical: String,
  prescriptions: String,
  schedule: String,
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

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
