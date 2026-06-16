
import { initNav, initFooter } from './nav.js';

initNav();
initFooter();


const ecosystems = [
  {
    name: 'Amazon Alexa',
    emoji: '🔵',
    description: 'The most device-compatible ecosystem. Works with thousands of products. Best for users who want maximum choice.',
    pros: '✔ Widest device support  ✔ Most affordable entry point  ✔ Strong third-party integrations'
  },
  {
    name: 'Google Home',
    emoji: '🔴',
    description: 'Excellent voice recognition and seamless integration with Android phones, Gmail, and Google Calendar.',
    pros: '✔ Best natural language understanding  ✔ Strong on Android  ✔ Good for routines'
  },
  {
    name: 'Apple HomeKit',
    emoji: '⚪',
    description: 'The most privacy-focused ecosystem. All automations run locally, not in the cloud. Requires Apple devices.',
    pros: '✔ Strongest privacy  ✔ No cloud dependency  ✔ Tight Apple device integration'
  }
];

const ecoGrid = document.getElementById('ecosystems');

if (ecoGrid) {
  ecosystems.forEach(eco => {
    const card = document.createElement('div');
    card.className = 'eco-card';
    card.innerHTML = `
      <h3>${eco.emoji} ${eco.name}</h3>
      <p>${eco.description}</p>
      <p class="eco-pros">${eco.pros}</p>
    `;
    ecoGrid.appendChild(card);
  });
}


const form    = document.getElementById('plan-form');
const tsField = document.getElementById('timestamp');

if (form && tsField) {
  form.addEventListener('submit', () => {
    tsField.value = new Date().toISOString();
  });
}
