class App {
  constructor() {
    this.addEventListener();
  }

  _getCpf() {
    return document.querySelector('#form__cpf').value;
  }

  _getPassword() {
    return document.querySelector('#form__password').value;
  }

  addEventListener() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.login();
    });
  }

  async login() {
    try {
      const data = await axios({
        method: 'post',
        url: 'https://healthsync-9u7e.onrender.com/api/pacientes/login',
        data: {
          cpf: this._getCpf(),
          password: this._getPassword(),
        },
      });
      console.log(data);
      window.location.replace(
        'https://healthsync-9u7e.onrender.com/paciente-overview'
      );
    } catch (err) {
      this.showPopup();
    }
  }

  showPopup() {
    const popup = document.querySelector('.popup');

    popup.classList.remove('opacity-0');

    setTimeout(() => popup.classList.add('opacity-0'), 2000);
  }
}

const app = new App();
