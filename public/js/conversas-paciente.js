const main = document.querySelector('.main');

main.addEventListener('click', (event) => {
  const button = event.target.closest('.startChat__button');

  if (!button) return;

  window.location.replace(
    `https://healthsync-9u7e.onrender.com/chat-room-paciente/${button.dataset.id}`
  );
});
