
import { initNav, initFooter } from './nav.js';

initNav();
initFooter();

const container    = document.getElementById('devices-container');
const gridBtn      = document.getElementById('grid-btn');
const listBtn      = document.getElementById('list-btn');
const filterSelect = document.getElementById('category-filter');
const modal        = document.getElementById('device-modal');
const backdrop     = document.getElementById('modal-backdrop');
const modalClose   = document.getElementById('modal-close');

let allDevices     = [];
const PREF_KEY     = 'shb-view-pref';
const savedView    = localStorage.getItem(PREF_KEY) || 'grid';


function setView(view) {
  localStorage.setItem(PREF_KEY, view);
  gridBtn.classList.toggle('active', view === 'grid');
  listBtn.classList.toggle('active', view === 'list');
  gridBtn.setAttribute('aria-pressed', String(view === 'grid'));
  listBtn.setAttribute('aria-pressed', String(view === 'list'));
  renderDevices(currentFiltered(), view);
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));


function currentFiltered() {
  const cat = filterSelect.value;
  return cat === 'all' ? allDevices : allDevices.filter(d => d.category === cat);
}

filterSelect.addEventListener('change', () => {
  renderDevices(currentFiltered(), localStorage.getItem(PREF_KEY) || 'grid');
});


function renderDevices(devices, view) {
  container.className = `${view}-view`;
  container.innerHTML = '';

  if (devices.length === 0) {
    container.innerHTML = '<p class="loading-msg">No devices match this filter.</p>';
    return;
  }

  if (view === 'grid') {
    devices.forEach(device => {
      const card = document.createElement('div');
      card.className = 'member-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View details for ${device.name}`);
      card.innerHTML = `
        <div class="card-icon" aria-hidden="true">${device.icon}</div>
        <h3>${device.name}</h3>
        <p>${device.category}</p>
        <p>${device.priceRange}</p>
        <span class="badge ${device.difficulty.toLowerCase()}">${device.difficulty}</span>
      `;
      card.addEventListener('click', () => openModal(device));
      card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(device); });
      container.appendChild(card);
    });
  } else {
    devices.forEach(device => {
      const row = document.createElement('div');
      row.className = 'member-list-item';
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.setAttribute('aria-label', `View details for ${device.name}`);
      row.innerHTML = `
        <span class="list-icon" aria-hidden="true">${device.icon}</span>
        <span class="list-name">${device.name}</span>
        <span class="list-cat">${device.category}</span>
        <span class="list-price">${device.priceRange}</span>
        <span class="list-diff"><span class="badge ${device.difficulty.toLowerCase()}">${device.difficulty}</span></span>
      `;
      row.addEventListener('click', () => openModal(device));
      row.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(device); });
      container.appendChild(row);
    });
  }
}


function openModal(device) {
  const diffClass = device.difficulty.toLowerCase();
  document.getElementById('modal-title').textContent    = device.name;
  document.getElementById('modal-category').innerHTML   = `<span class="badge ${diffClass}">${device.category}</span>`;
  document.getElementById('modal-difficulty').textContent = `⚙️ Setup difficulty: ${device.difficulty}`;
  document.getElementById('modal-price').textContent    = `💰 Price range: ${device.priceRange}`;
  document.getElementById('modal-works').textContent    = `🗣 Works with: ${device.worksWiths}`;
  document.getElementById('modal-desc').textContent     = device.description;
  document.getElementById('modal-tip').innerHTML        = `<strong>💡 Beginner tip:</strong> ${device.beginnerTip}`;


  let iconEl = modal.querySelector('.card-icon');
  if (!iconEl) {
    iconEl = document.createElement('div');
    iconEl.className = 'card-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    modal.querySelector('.modal-content').prepend(iconEl);
  }
  iconEl.textContent = device.icon;

  modal.hidden    = false;
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.hidden    = true;
  backdrop.hidden = true;
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


async function loadDevices() {
  container.innerHTML = '<p class="loading-msg">Loading devices&hellip;</p>';
  try {
    const res = await fetch('data/devices.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allDevices = await res.json();
    setView(savedView);
  } catch (err) {
    console.error('Failed to load devices:', err);
    container.innerHTML = '<p class="loading-msg">Unable to load device data. Please try again later.</p>';
  }
}

loadDevices();
