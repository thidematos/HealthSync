class App {
  main = document.querySelector('.main');
  constructor() {
    this.renderButtons();
  }

  generateHTML(doctor) {
    const html = `<button class="startChat__button" data-id="${doctor._id}">
            <div class="startChat__text">
                <p>${doctor.name}</p>
                <p>${doctor.city} - ${doctor.state} </p>
            </div>
            <div class="startChat__img-container">
                <img class="startChat__img" src="./../assets/${doctor.photo}">
            </div>
        </button>`;

    return html;
  }

  addLinks() {
    this.main.addEventListener('click', (event) => {
      const button = event.target.closest('.startChat__button');
      if (!button) return;

      window.location.replace(
        `https://healthsync-9u7e.onrender.com/chat-room/${button.dataset.id}`
      );
    });
  }

  async renderButtons() {
    const doctors = await this.getData();

    doctors.forEach((doctor) => {
      this.main.insertAdjacentHTML('beforeend', this.generateHTML(doctor));
    });

    this.addLinks();
  }

  async getData() {
    const speciality = document.querySelector('.speciality').dataset.speciality;

    const response = await axios({
      method: 'get',
      url: `https://healthsync-9u7e.onrender.com/api/medicos?speciality=${speciality}`,
    });

    return response.data.data.doctor;
  }
}

const app = new App();
