exports.index = (req, res, next) => {
  res.status(200).render('index');
};

exports.cadastroMedico = (req, res, next) => {
  res.status(200).render('cadastroMedico');
};

exports.login = (req, res, next) => {
  if (!req.params.user) res.status(200).render('login');

  if (req.params.user === 'medico') res.status(200).render('login-doctor');
  else if (req.params.user === 'paciente') res.status(200).render('login-user');
};

exports.medicoOverview = (req, res, next) => {
  res.locals.user = req.user;
  res.status(200).render('medico-overview');
};

exports.pacienteOverview = (req, res, next) => {
  res.locals.user = req.user;
  res.status(200).render('paciente-overview');
};

exports.chat = (req, res, next) => {
  res.locals.user = req.user;
  res.status(200).render('toChat');
};

exports.specialityChat = (req, res, next) => {
  res.locals.speciality = req.params.speciality;
  res.locals.user = req.user;
  res.status(200).render('toChat-speciality');
};

exports.chatRoom = (req, res, next) => {
  res.locals.user = req.user;
  res.status(200).render('chatRoom');
};

exports.conversas = (req, res, next) => {
  res.locals.user = req.user;

  res.status(200).render('conversas');
};

exports.conversasPaciente = (req, res, next) => {
  res.locals.user = req.user;

  res.status(200).render('conversas-paciente');
};

exports.medicos = (req, res, next) => {
  res.locals.user = req.user;

  res.status(200).render('medicos');
};

exports.medicoDetails = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.doctor = req.currentMedico;
  res.status(200).render('medicoDetails');
};

exports.agendamento = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.doctor = req.currentMedico;

  res.status(200).render('agendamento');
};

exports.consultas = (req, res, next) => {
  res.locals.user = req.user;

  res.status(200).render('consultas');
};

exports.pacientes = (req, res, next) => {
  res.locals.user = req.user;
  console.log(req.user.pacientes);

  res.status(200).render('pacientes');
};
