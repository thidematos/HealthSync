class App {
  main = document.querySelector('.main');
  constructor() {
    this.createLinks();
    this.addLinks();
  }

  generateHTML(speciality) {
    const html = `<button class="toChat__button" data-speciality="${speciality}">${speciality}</button>`;
    return html;
  }

  async createLinks() {
    const specialities = [];
    const doctors = await this.getData();
    doctors.forEach((doctor) => {
      if (!specialities.includes(doctor.speciality)) {
        specialities.push(doctor.speciality);
        this.main.insertAdjacentHTML(
          'beforeend',
          this.generateHTML(doctor.speciality)
        );
      }
    });
  }

  addLinks() {
    this.main.addEventListener('click', (event) => {
      const button = event.target.closest('.toChat__button');
      if (!button) return;

      window.location.replace(
        `https://healthsync-9u7e.onrender.com/chat/${button.dataset.speciality}`
      );
    });
  }

  async getData() {
    const id = document.querySelector('.imgId').dataset.id;
    const response = await axios({
      method: 'get',
      url: `https://healthsync-9u7e.onrender.com/api/medicos?fields=speciality,name&_id[ne]=${id}`,
    });
    console.log(response.data.data);
    return response.data.data.doctor;
  }
}

const app = new App();
