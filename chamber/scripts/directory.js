
const membersContainer = document.getElementById('members-container');
const gridBtn          = document.getElementById('grid-btn');
const listBtn          = document.getElementById('list-btn');
const menuToggle       = document.getElementById('menu-toggle');
const mainNavUl        = document.querySelector('#main-nav ul');
const copyrightYear    = document.getElementById('copyright-year');
const lastModified     = document.getElementById('last-modified');


copyrightYear.textContent = new Date().getFullYear();
lastModified.textContent  = document.lastModified;


menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute(
    'aria-expanded',
    menuToggle.classList.contains('open') ? 'true' : 'false'
  );
  mainNavUl.classList.toggle('open');
});


let currentView = 'grid';


function setView(view) {
  currentView = view;

  if (view === 'grid') {
    membersContainer.className = 'grid-view';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
  } else {
    membersContainer.className = 'list-view';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
  }
}

gridBtn.addEventListener('click', () => {
  setView('grid');
  renderMembers(window.membersData);
});

listBtn.addEventListener('click', () => {
  setView('list');
  renderMembers(window.membersData);
});


function createGridCard(member) {
  const card = document.createElement('article');
  card.classList.add('member-card');

  card.innerHTML = `
    <img
      src="${member.image}"
      alt="${member.name} logo"
      width="120"
      height="80"
      loading="lazy"
      onerror="this.src='images/placeholder.png'; this.onerror=null;"
    >
    <h3>${member.name}</h3>
    <p>${member.address}</p>
    <p>${member.phone}</p>
    <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a>
  `;

  return card;
}


function createListItem(member) {
  const item = document.createElement('article');
  item.classList.add('member-list-item');

  item.innerHTML = `
    <span class="list-name">${member.name}</span>
    <span class="list-address">${member.address}</span>
    <span class="list-phone">${member.phone}</span>
    <span class="list-url">
      <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a>
    </span>
  `;

  return item;
}

function renderMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach(member => {
    const el = currentView === 'grid'
      ? createGridCard(member)
      : createListItem(member);
    membersContainer.appendChild(el);
  });
}


async function loadMembers() {
  membersContainer.innerHTML = '<p class="loading-msg">Loading members&hellip;</p>';

  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const members = await response.json();
    window.membersData = members; // store for re-renders on toggle
    setView('grid');
    renderMembers(members);

  } catch (error) {
    membersContainer.innerHTML =
      '<p class="loading-msg">Unable to load member data. Please try again later.</p>';
    console.error('Failed to load members.json:', error);
  }
}


loadMembers();