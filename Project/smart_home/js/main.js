
import { initNav, initFooter } from './nav.js';

initNav();
initFooter();


const TIPS = [
  'Start with a smart plug — it turns any lamp or fan into a smart device for under $15.',
  'Put smart devices on a separate guest Wi-Fi network to protect your main devices.',
  'Voice commands work best when your device names are short and distinct — "kitchen light" beats "Philips Hue Bulb 1".',
  'Most smart home apps let you share access with family members without sharing your password.',
  'A smart thermostat pays for itself in 1–2 years through energy savings.',
  'Before buying any device, check it works with the voice assistant you already own.',
  'Smart water sensors under your sink are cheap insurance against expensive water damage.',
  'Group devices by room in your smart home app to control them all with one command.',
  'Routines (like "Good Morning" turning on lights and the coffee maker) are where smart homes get fun.',
  'Update your smart device firmware regularly — it patches security vulnerabilities.'
];

const TIP_KEY  = 'shb-tip-date';
const TIP_IDX  = 'shb-tip-index';
const todayStr = new Date().toDateString();
const tipEl    = document.getElementById('daily-tip');

if (tipEl) {
  let idx;
  if (localStorage.getItem(TIP_KEY) !== todayStr) {
    idx = Math.floor(Math.random() * TIPS.length);
    localStorage.setItem(TIP_KEY, todayStr);
    localStorage.setItem(TIP_IDX, String(idx));
  } else {
    idx = parseInt(localStorage.getItem(TIP_IDX) || '0', 10);
  }
  tipEl.textContent = TIPS[idx];
}


async function loadSpotlights() {
  const container = document.getElementById('spotlights');
  if (!container) return;

  try {
    const res = await fetch('data/devices.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const devices = await res.json();

    const featured = devices.filter(d => d.featured);

    featured.forEach(device => {
      const card = document.createElement('div');
      card.className = 'member-card';
      card.innerHTML = `
        <div class="card-icon" aria-hidden="true">${device.icon}</div>
        <h3>${device.name}</h3>
        <p>${device.category}</p>
        <p>${device.priceRange}</p>
        <span class="badge ${device.difficulty.toLowerCase()}">${device.difficulty}</span>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Spotlight load failed:', err);
    if (container) container.innerHTML = '<p class="loading-msg">Unable to load device spotlights.</p>';
  }
}

loadSpotlights();
