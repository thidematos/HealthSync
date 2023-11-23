class App {
  medicosContainer = document.querySelector('.medicos__container');
  otherStatesContainer = document.querySelector('.otherStates__container');
  title = document.querySelector('.title');
  constructor() {
    this.getAllMedicos();
  }

  async getAllMedicos() {
    const response = await axios({
      method: 'get',
      url: 'https://healthsync-9u7e.onrender.com/api/medicos',
    });
    this.doctors = response.data.data.doctor;
    this.selectNearBy(this.myState());
    this.populateOtherStates(this.myState());
    this.alternateStates();
    this.listenForDetails();
  }

  myState() {
    const userLocation = document
      .querySelector('.user__location')
      .textContent.split(' - ')[1];

    return userLocation;
  }

  selectNearBy(location) {
    this.medicosContainer.innerHTML = '';

    const filteredDoctors = this.doctors.filter(
      (doctor) => doctor.state === location.trim()
    );

    filteredDoctors.forEach((doctor) => {
      this.medicosContainer.insertAdjacentHTML(
        'beforeend',
        this.generateHTML(doctor)
      );
    });
  }

  populateOtherStates(currentState) {
    this.otherStatesContainer.innerHTML = '';

    const states = this.doctors.map((doctor) => doctor.state);
    const statesSet = [...new Set(states)];
    const statesSetFiltered = statesSet.filter((state) => {
      return state.trim() !== currentState.trim();
    });

    statesSetFiltered.forEach((state) =>
      this.otherStatesContainer.insertAdjacentHTML(
        'beforeend',
        this.generateOtherStates(state)
      )
    );
  }

  listenForDetails() {
    this.medicosContainer.addEventListener('click', (event) => {
      const button = event.target.closest('.startChat__button');

      if (!button) return;

      window.location.replace(
        `https://healthsync-9u7e.onrender.com/medicos/${button.dataset.id}`
      );
    });
  }

  alternateStates() {
    this.otherStatesContainer.addEventListener('click', (event) => {
      const button = event.target.closest('.otherStates__button');

      if (!button) return;

      const state = button.textContent.trim();

      this.title.textContent = state;

      this.selectNearBy(state);
      this.populateOtherStates(state);
    });
  }

  generateOtherStates(state) {
    return `<button class="otherStates__button"> ${state} </button>`;
  }

  generateHTML(doctor) {
    const html = `<button class="startChat__button" data-id="${doctor._id}">
                <div class="startChat__text">
                    <p>${doctor.name}</p>
                    <p>${doctor.speciality}</p>
                    <p>${doctor.city} - ${doctor.state} </p>
                </div>
                <div class="startChat__img-container">
                    <img class="startChat__img" src="./../assets/${doctor.photo}">
                </div>
            </button>`;

    return html;
  }
}

const app = new App();
