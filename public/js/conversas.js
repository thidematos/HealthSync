const main = document.querySelector('.main');

main.addEventListener('click', (event) => {
  const button = event.target.closest('.startChat__button');

  if (!button) return;

  window.location.replace(
    `http://127.0.0.1:3000/chat-room/${button.dataset.id}`
  );
});
