class App {
  dispoContainer = document.querySelector('.dispo__container');
  dateButtons = document.querySelectorAll('.date__container');
  confirmContainer = document.querySelector('.confirm__container');
  scheduleButton = document.querySelector('.schedule__button');
  helpText = document.querySelector('.help__text');
  confirmHourContainer = document.querySelector('.confirmHour__container');
  hideOnHttp = document.querySelectorAll('.hideOnHttp');
  loader = document.querySelector('.loader');
  inputReason = document.querySelector('.input__reason');

  doctorId = document.querySelector('.doctorId').dataset.id;
  userId = document.querySelector('.imgId').dataset.id;

  constructor() {
    this.listenSelectDay();
    this.listenSchedule();
  }

  listenSelectDay() {
    this.dispoContainer.addEventListener('click', (event) => {
      const dayButton = event.target.closest('.date__container');
      if (!dayButton) return;
      this.inputReason.classList.add('hidden');
      this.inputReason.value = '';
      this.scheduleButton.classList.add('hidden');
      this.setDayAndHours(dayButton);
      this.toggleDaySelection(this.dateButtons, dayButton);
      this.showConfirm();
    });
  }

  setDayAndHours(button) {
    const day = button.querySelector('.day').textContent;
    const hours = [...button.querySelectorAll('.hour')].map(
      (hour) => hour.textContent
    );

    this.selectedDate = {
      day,
      hours,
    };
  }

  toggleDaySelection(buttonsArr, currentButton = undefined) {
    buttonsArr.forEach((button) => {
      button.classList.remove('text-gray-50');
      button.classList.add('text-gray-700');
      button.classList.remove('bg-azul');
      button.classList.add('bg-white');
    });

    if (!currentButton) return;
    currentButton.classList.remove('text-gray-700');
    currentButton.classList.add('text-gray-50');
    currentButton.classList.remove('bg-white');
    currentButton.classList.add('bg-azul');
  }

  showConfirm() {
    this.helpText.classList.add('hidden');
    this.confirmContainer.classList.remove('hidden');

    this.changeConfirmContent();
  }

  changeConfirmContent() {
    const confirmDay = document.querySelector('.confirmDay');

    confirmDay.textContent = this.selectedDate.day;
    this.confirmHourContainer.innerHTML = '';
    this.selectedDate.hours.forEach((hour) => {
      this.confirmHourContainer.insertAdjacentHTML(
        'beforeend',
        `<p class="confirmHour bg-white">${hour}</p>`
      );
    });
    this.listenSelectHour();
  }

  listenSelectHour() {
    this.confirmHourContainer.addEventListener('click', (event) => {
      const hour = event.target.closest('.confirmHour');

      if (!hour) return;
      this.toggleDaySelection(document.querySelectorAll('.confirmHour'), hour);

      this.inputReason.classList.remove('hidden');

      this.scheduleButton.classList.remove('hidden');

      this.selectedDate.selectedHour = hour.textContent;
    });
  }

  listenSchedule() {
    this.scheduleButton.addEventListener('click', async () => {
      this.hideOnHttp.forEach((container) => container.classList.add('hidden'));
      this.loader.classList.remove('hidden');

      const response = await axios({
        method: 'post',
        url: `http://127.0.0.1:3000/api/pacientes/schedule/${this.doctorId}`,
        data: {
          pacienteId: this.userId,
          day: this.selectedDate.day,
          hour: this.selectedDate.selectedHour,
          reason: this.inputReason.value,
        },
      });

      console.log(response);
      this.loader.classList.add('hidden');

      const sucessContainer = document.querySelector('.sucess__schedule');
      const scheduleDay = document.querySelector('.schedule__day');
      const scheduleHour = document.querySelector('.schedule__hour');
      sucessContainer.classList.remove('hidden');

      scheduleDay.textContent = this.selectedDate.day;
      scheduleHour.textContent = this.selectedDate.selectedHour;
      const footer = document.querySelector('footer');
      footer.classList.add('absolute');
      footer.classList.add('bottom-0');
    });
  }
}

const app = new App();
