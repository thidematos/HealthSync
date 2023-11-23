class App {
  prontuarioData = {
    paciente: undefined,
    healthPlan: undefined,
    medico: undefined,
    date: undefined,
  };
  constructor() {
    this.setter();
  }

  setter() {
    this.setPaciente();
    this.setHealthPlan();
    this.setMedico();
    this.setDate();

    console.log(this.prontuarioData);
  }

  setPaciente() {
    const pacientId = document.querySelector('.pacientId').dataset.pacienteid;

    this.prontuarioData.paciente = pacientId;
  }

  setHealthPlan() {
    const pacientHealthPlan =
      document.querySelector('.pacientHealthPlan').textContent;

    this.prontuarioData.healthPlan = pacientHealthPlan;
  }

  setMedico() {
    const medico = document.querySelector('.imgId').dataset.id;

    this.prontuarioData.medico = medico;
  }

  setDate() {
    const date = document.querySelector('.date').textContent;

    this.prontuarioData.date = date.replaceAll(' ', '');
  }
}

const app = new App();
