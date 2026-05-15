
const membersContainer = document.getElementById('members-container');
const gridBtn          = document.getElementById('grid-btn');
const listBtn          = document.getElementById('list-btn');
const menuToggle       = document.getElementById('menu-toggle');
const mainNav          = document.getElementById('main-nav').querySelector('ul');
const copyrightYear    = document.getElementById('copyright-year');
const lastModified     = document.getElementById('last-modified');


let currentView = 'grid';


copyrightYear.textContent = new Date().getFullYear();
lastModified.textContent  = document.lastModified;


menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute(
    'aria-expanded',
    menuToggle.classList.contains('open') ? 'true' : 'false'
  );
  mainNav.classList.toggle('open');
});


function setView(view) {
  currentView = view;

  if (view === 'grid') {
    membersContainer.className = 'grid-view';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  } else {
    membersContainer.className = 'list-view';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  }
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));


function getLevelLabel(level) {
  if (level === 3) return 'Gold';
  if (level === 2) return 'Silver';
  return 'Member';
}

function getLevelClass(level) {
  if (level === 3) return 'badge-gold';
  if (level === 2) return 'badge-silver';
  return 'badge-member';
}


const iconPhone   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;
const iconAddress = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const iconWeb     = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`;
const iconGrid    = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
const iconList    = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`;

// Inject icons into buttons
gridBtn.insertAdjacentHTML('afterbegin', iconGrid);
listBtn.insertAdjacentHTML('afterbegin', iconList);


function createGridCard(member, index) {
  const label     = getLevelLabel(member.level);
  const badgeCls  = getLevelClass(member.level);
  const delay     = index * 0.05;

  const card = document.createElement('article');
  card.classList.add('member-card');
  card.style.animationDelay = `${delay}s`;

  card.innerHTML = `
    <div class="card-img-wrap">
      <img
        src="${member.image}"
        alt="${member.name} business photo"
        loading="lazy"
        onerror="this.src='images/placeholder.svg'; this.onerror=null;"
      >
      <span class="card-badge ${badgeCls}">${label}</span>
    </div>
    <div class="card-body">
      <h3>${member.name}</h3>
      <p class="card-desc">${member.description}</p>
      <div class="card-info">
        <span>${iconAddress} ${member.address}</span>
        <span>${iconPhone} <a href="tel:${member.phone.replace(/\D/g,'')}">${member.phone}</a></span>
        <span>${iconWeb} <a href="${member.website}" target="_blank" rel="noopener">${new URL(member.website).hostname.replace('www.','')}</a></span>
      </div>
      <a class="card-link" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    </div>
  `;

  return card;
}


function createListItem(member, index) {
  const label    = getLevelLabel(member.level);
  const badgeCls = getLevelClass(member.level);
  const delay    = index * 0.04;

  const item = document.createElement('article');
  item.classList.add('member-list-item');
  item.style.animationDelay = `${delay}s`;

  item.innerHTML = `
    <div class="list-badge ${badgeCls}" title="${label} Member" aria-label="${label} membership"></div>
    <div class="list-info">
      <strong>${member.name}</strong>
      <small>${member.address} &bull; ${member.phone}</small>
    </div>
    <div class="list-right">
      <span class="card-badge ${badgeCls}">${label}</span>
      <a class="list-link" href="${member.website}" target="_blank" rel="noopener">Website &rarr;</a>
    </div>
  `;

  return item;
}


function renderMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach((member, index) => {
    const el = currentView === 'grid'
      ? createGridCard(member, index)
      : createListItem(member, index);
    membersContainer.appendChild(el);
  });
}


async function loadMembers() {
  membersContainer.innerHTML = '<p class="loading-msg">Loading members&hellip;</p>';

  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const members = await response.json();
    renderMembers(members);

    // Re-render on view toggle (keeps data in memory)
    gridBtn.addEventListener('click', () => renderMembers(members));
    listBtn.addEventListener('click', () => renderMembers(members));

  } catch (err) {
    membersContainer.innerHTML = `<p class="loading-msg">Unable to load member data. Please try again later.</p>`;
    console.error('Failed to fetch members.json:', err);
  }
}


setView('grid');
loadMembers();