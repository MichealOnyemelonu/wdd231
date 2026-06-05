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
