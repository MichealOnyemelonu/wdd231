import { savePreference } from './storage.js';
import { openModal } from './modal.js';

const container = document.querySelector('#device-list');

async function loadDevices() {
  try {
    const response = await fetch('data/devices.json');
    if (!response.ok) throw new Error('Data fetch failed');

    const devices = await response.json();

    devices.forEach(device => {
      const card = document.createElement('article');
      card.innerHTML = `
        <h3>${device.name}</h3>
        <p>Category: ${device.category}</p>
        <p>Brand: ${device.brand}</p>
        <p>Price: $${device.price}</p>
        <button>View Details</button>
      `;

      card.querySelector('button').addEventListener('click', () => {
        savePreference(device.name);
        openModal(device);
      });

      container.appendChild(card);
    });

  } catch (error) {
    container.textContent = 'Unable to load devices.';
    console.error(error);
  }
}

loadDevices();