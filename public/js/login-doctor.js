class App {
  constructor() {
    this.addEventListener();
  }

  _getCrm() {
    return document.querySelector('#form__crm').value;
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
        url: 'http://127.0.0.1:3000/api/medicos/login',
        data: {
          crm: this._getCrm(),
          password: this._getPassword(),
        },
      });
      console.log(data);
      window.location.replace('http://127.0.0.1:3000/medico-overview');
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