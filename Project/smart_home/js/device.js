import { getDevices } from './fetch.js';
import { setupModal } from './modal.js';

export async function loadDevices() {
  const devices = await getDevices();
  const container = document.querySelector("#deviceContainer");

  if (!container) return;

  container.innerHTML = devices.map(d => `
    <div class="card">
      <h3>${d.name}</h3>
      <p>${d.category}</p>
      <p>${d.price}</p>
      <button data-id="${d.id}">Details</button>
    </div>
  `).join('');

  setupModal(devices);
}