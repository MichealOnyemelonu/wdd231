

export function initNav() {
  function setup() {
    const toggle = document.getElementById('menu-toggle');
    const navUl  = document.querySelector('#main-nav ul');

    if (!toggle || !navUl) return;

  
    const freshToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(freshToggle, toggle);

    freshToggle.addEventListener('click', () => {
      const isOpen = freshToggle.classList.toggle('open');
      freshToggle.setAttribute('aria-expanded', String(isOpen));
      navUl.classList.toggle('open', isOpen);
    });

   
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        freshToggle.classList.remove('open');
        freshToggle.setAttribute('aria-expanded', 'false');
        navUl.classList.remove('open');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}

export function initFooter() {
  function setup() {
    const yearEl = document.getElementById('copyright-year');
    const modEl  = document.getElementById('last-modified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl)  modEl.textContent  = document.lastModified;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}