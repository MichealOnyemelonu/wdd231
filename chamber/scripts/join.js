
document.getElementById("timestamp").value = new Date().toISOString();


const modalLinks = document.querySelectorAll(".modal-link");


const menuToggle = document.getElementById('menu-toggle');
const mainNavUl = document.querySelector('#main-nav ul');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    menuToggle.classList.contains('open') ? 'true' : 'false'
  );

  mainNavUl.classList.toggle('open');
});



modalLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const modalId = link.dataset.modal;
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.showModal();
    }
  });
});


const closeButtons = document.querySelectorAll("dialog button");

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});
