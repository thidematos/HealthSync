const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const medicoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Um médico deve ter um nome!'],
  },
  crm: {
    type: String,
    required: [true, 'Um médico deve ter um CRM!'],
    unique: [true, 'Esse CRM já existe. Por favor, tente novamente.'],
  },
  speciality: {
    type: String,
    required: [true, 'Um médico deve ter uma especialidade!'],
  },
  phone: {
    type: String,
    required: [true, 'Um médico deve ter um telefone!'],
  },
  photo: {
    type: String,
    required: [true, 'Um médico deve ter uma foto!'],
  },
  email: {
    type: String,
    required: [true, 'Um médico deve ter um email!'],
  },
  city: {
    type: String,
    required: [true, 'Um médico deve ter um cidade!'],
  },
  state: {
    type: String,
    required: [true, 'Um médico deve ter um estado!'],
  },
  password: {
    type: String,
    required: [true, 'Um médico deve ter uma senha'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Um médico deve ter uma confirmação de senha'],
    validate: {
      validator: function (field) {
        return field === this.password;
      },
    },
  },
  role: {
    type: String,
    default: 'medico',
  },
  disponibilidade: [
    {
      day: String,
      hour: [String],
    },
  ],
  pacientes: [
    {
      pacienteId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Paciente',
      },
      day: String,
      hour: String,
      reason: String,
    },
  ],
});

medicoSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

medicoSchema.post('save', async function () {
  this.password = undefined;
});

medicoSchema.methods.correctPassword = async function (
  reqPassword,
  userPassword
) {
  return await bcrypt.compare(reqPassword, userPassword);
};

medicoSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'pacientes',
    populate: {
      path: 'pacienteId',
      select: '-role -__v -schedule',
    },
  });
  next();
});

const Medico = mongoose.model('Medico', medicoSchema);

module.exports = Medico;
