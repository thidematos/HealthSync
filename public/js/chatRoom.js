class App {
  socket = io();
  username = document.querySelector('.username').textContent;
  id = document.querySelectorAll('.imgId')[0].dataset.id;
  id2 = document.querySelectorAll('.imgId')[1].dataset.id;
  form = document.querySelector('#form');
  input = document.querySelector('#input');
  messagesContainer = document.querySelector('#messages');

  constructor() {
    this.socket.emit('joinRoom', { id: this.id, id2: this.id2 });
    this.listenForStart();
    this.emitChatMessage();
    this.listenOnMessage();
    this.listenMessageRecovery();
  }

  listenForStart() {
    this.socket.on('serverStarted', (data) => {
      this.room = data.room;
      this.messagesContainer.insertAdjacentHTML(
        'beforeend',
        this.generateServerMessage(data.msg)
      );
    });
  }

  emitChatMessage() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!input.value) return;

      //Emit message to the server
      this.socket.emit('chatMessage', {
        msg: this.input.value,
        room: this.room,
        currentUser: this.id,
      });

      this.input.value = '';
    });
  }

  listenOnMessage() {
    console.log('hi');
    this.socket.on('message', (metadata) => {
      const html = this.generateMessageHtml(
        metadata.id,
        metadata.msg,
        metadata.photo,
        metadata.time
      );
      this.messagesContainer.insertAdjacentHTML('beforeend', html);
    });

    this.socket.on('serverMessage', (msg) => {
      this.messagesContainer.insertAdjacentHTML(
        'beforeend',
        this.generateServerMessage(msg)
      );
    });
  }

  listenMessageRecovery() {
    this.socket.on('messageRecovery', (messages) => {
      this.messagesContainer.innerHTML = '';
      console.log('Recovery');
      messages.forEach((message) => {
        const html = this.generateMessageHtml(
          message.userId,
          message.msg,
          message.photo,
          message.timestamp
        );
        this.messagesContainer.insertAdjacentHTML('beforeend', html);
      });
    });
  }

  generateMessageHtml(id, message, photo, time) {
    return `
    <li class="text-message ${id === this.id ? '' : 'reverse'}">
      <img class="text-img" src="./../assets/${photo}">
      <p class="text-p ${id === this.id ? '' : 'text-righttt'}"> ${message} </p>
      <p class="text-time"> ${time} </p>
    </li>
    `;
  }

  generateServerMessage(message) {
    return `
    <li class="text-message">
      <p class="text-p-server"> ${message} </p>
    </li>
    `;
  }
}

const app = new App();
