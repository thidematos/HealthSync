class App {
  prontuarioData = {
    paciente: undefined,
    cod: undefined,
    healthPlan: undefined,
    medico: undefined,
    date: undefined,
    anamnese: [],
    diagnosis: [],
    treatment: {
      recomendation: undefined,
      prescriptions: [],
    },
    exams: [],
    observations: undefined,
  };
  constructor() {
    this.setter();
    this.addEventListeners();
  }

  setter() {
    this.setPaciente();
    this.setHealthPlan();
    this.setMedico();
    this.setDate();
    this.setCod();

    console.log(this.prontuarioData);
  }

  addEventListeners() {
    this.submit();
    this.newAnamnese();
    this.newDiagnostico();
    this.newTratamento();
    this.newExame();
  }

  setCod() {
    const cod = document.querySelector('.cod');

    this.prontuarioData.cod = cod.textContent;
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

  setAnamnese() {
    const inputSintomas = document.querySelectorAll('.input__sintomas');
    const inputInicio = document.querySelectorAll('.input__inicio');

    inputSintomas.forEach((sintoma, ind) => {
      this.prontuarioData.anamnese.push({
        reports: sintoma.value,
        timeSinceStarted: inputInicio[ind].value,
      });
    });
  }

  setDiagnostico() {
    const inputDiagnostico = document.querySelectorAll('.input__diagnostico');

    inputDiagnostico.forEach((diagnostico, ind) => {
      this.prontuarioData.diagnosis.push({
        main: diagnostico.value,
      });
    });
  }

  setTratamento() {
    const inputRecomendacao = document.querySelector('.input__recomendacao');
    const inputMedicamento = document.querySelectorAll('.input__medicamento');
    const inputDosagem = document.querySelectorAll('.input__dosagem');
    const inputPeriodo = document.querySelectorAll('.input__periodo');

    this.prontuarioData.treatment.recomendation = inputRecomendacao.value;
    inputMedicamento.forEach((medicamento, ind) => {
      this.prontuarioData.treatment.prescriptions.push({
        medicamento: medicamento.value,
        dosagem: inputDosagem[ind].value,
        periodo: inputPeriodo[ind].value,
      });
    });
  }

  setExame() {
    const inputCategoria = document.querySelectorAll('.input__categoria');
    const inputResultados = document.querySelectorAll('.input__resultados');
    inputCategoria.forEach((categoria, ind) => {
      this.prontuarioData.exams.push({
        name: categoria.value || undefined,
        results: inputResultados[ind].value || undefined,
      });
    });
  }

  setObservacao() {
    const inputObservacao = document.querySelector('.input__observacao');

    this.prontuarioData.observations = inputObservacao.value;
  }

  newAnamnese() {
    const addAnamnese = document.querySelector('.addAnamnese');
    const anamneseContainer = document.querySelector('.anamnese__container');
    let counter = 1;

    addAnamnese.addEventListener('click', () => {
      const html = `
        <p class="label__bold"> SINTOMAS - ${counter + 1} </p>
        <input type="text" name="" class="input__sintomas p-2">
        <p class="label__bold"> INÍCIO - ${counter + 1} </p>
        <input type="text" name="" class="input__inicio p-2">
      `;
      anamneseContainer.insertAdjacentHTML('beforeend', html);
      counter++;
    });
  }

  newDiagnostico() {
    const addDiagnostico = document.querySelector('.addDiagnostico');
    const diagnosticoContainer = document.querySelector(
      '.diagnostico__container'
    );

    const html = `
      <p class="label__bold"> SECUNDÁRIO </p>
      <input type="text" name="" class="input__diagnostico p-2">
      `;

    addDiagnostico.addEventListener('click', () => {
      diagnosticoContainer.insertAdjacentHTML('beforeend', html);
    });
  }

  newTratamento() {
    const addTratamento = document.querySelector('.addTratamento');
    const prescriptionContainer = document.querySelector(
      '.prescription__container'
    );
    let counter = 1;

    addTratamento.addEventListener('click', () => {
      const html = `
        <p class="font-bold"> MEDICAMENTO - ${counter + 1} </p>
        <input type="text" name="" class="input__medicamento input__padding">
        <p class="font-bold"> DOSAGEM - ${counter + 1} </p> 
        <input type="text" name="" class="input__dosagem input__padding">        
        <p class="font-bold"> PERÍODO - ${counter + 1} </p> 
        <input type="text" name="" class="input__periodo input__padding"> 
      `;
      prescriptionContainer.insertAdjacentHTML('beforeend', html);
      counter++;
    });
  }

  newExame() {
    const addExame = document.querySelector('.addExame');
    const exameContainer = document.querySelector('.exame__container');
    let counter = 1;

    addExame.addEventListener('click', () => {
      const html = `
        <p class="font-bold"> CATEGORIA - ${counter + 1} </p>
        <input type="text" name="" class="input__categoria p-2"> 
        <p class="font-bold"> RESULTADOS - ${counter + 1} </p> 
        <textarea name="" cols="24" rows="3" class="input__resultados p-2">
      `;

      exameContainer.insertAdjacentHTML('beforeend', html);
      counter++;
    });
  }

  showSucess() {
    const main = document.querySelector('.main');
    const sucess = document.querySelector('.sucess');
    const footer = document.querySelector('footer');
    main.classList.add('hidden');
    sucess.classList.remove('hidden');
    footer.classList.add('absolute', 'bottom-0');
  }

  submit() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.setAnamnese();
      this.setDiagnostico();
      this.setTratamento();
      this.setExame();
      this.setObservacao();
      console.log(this.prontuarioData);

      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/prontuario',
        data: this.prontuarioData,
      });

      this.showSucess();
    });
  }
}

const app = new App();
