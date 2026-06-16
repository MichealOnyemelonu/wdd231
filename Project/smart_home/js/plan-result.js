
import { initNav, initFooter } from './nav.js';

initNav();
initFooter();

const params     = new URLSearchParams(window.location.search);
const greetingEl = document.getElementById('result-greeting');
const summaryEl  = document.getElementById('submission-summary');
const recoEl     = document.getElementById('recommendation');


const LABELS = {
  pname:     'Name',
  email:     'Email',
  hometype:  'Home type',
  budget:    'Budget',
  goal:      'Main goal',
  comfort:   'Tech comfort',
  notes:     'Notes',
  timestamp: 'Submitted at'
};


const name = params.get('pname') || 'there';
if (greetingEl) {
  greetingEl.textContent = `Thanks, ${name}! Here's a summary of your starter plan request.`;
}


if (summaryEl) {
  const entries = [...params.entries()].filter(([, v]) => v.trim() !== '');
  if (entries.length === 0) {
    summaryEl.innerHTML = '<p>No submission data found.</p>';
  } else {
    entries.forEach(([key, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = LABELS[key] || key;
      const dd = document.createElement('dd');
      dd.textContent = value;
      summaryEl.appendChild(dt);
      summaryEl.appendChild(dd);
    });
  }
}


const RECOMMENDATIONS = {
  convenience: {
    title: 'Everyday Convenience Starter Pack',
    items: [
      'Smart plug ($10 - 15) — control any lamp or fan by voice right away',
      'Smart speaker ($30 - 50) — the command center for all your devices',
      'Smart bulbs for your main living area ($15 - 30 per bulb)'
    ]
  },
  security: {
    title: 'Home Security Starter Pack',
    items: [
      'Video doorbell ($60 - 100) — see who's at the door from anywhere',
      'Smart lock ($80 - 150) — keyless entry with activity logs',
      'Indoor camera ($25 - 50) — monitor your home remotely',
      'Smart water sensor under the sink ($15 - 20)'
    ]
  },
  energy: {
    title: 'Energy Savings Starter Pack',
    items: [
      'Smart thermostat ($100 - 150) — the single biggest energy saver',
      'Smart plugs on high-draw appliances ($10 - 15 each)',
      'Smart power strip for your entertainment center ($25 - 40)'
    ]
  },
  entertainment: {
    title: 'Entertainment Starter Pack',
    items: [
      'Smart speaker or display ($50 - 150)',
      'Smart bulbs with color support for ambiance ($20 - 35 each)',
      'Smart TV or streaming device with voice control ($30 - 200)'
    ]
  }
};

const goal = params.get('goal');
const reco = RECOMMENDATIONS[goal] || RECOMMENDATIONS['convenience'];

if (recoEl) {
  const listItems = reco.items.map(item => `<li>${item}</li>`).join('');
  recoEl.innerHTML = `
    <h2>🎯 Recommended: ${reco.title}</h2>
    <p>Based on your goal and preferences, here's where we suggest starting:</p>
    <ul>${listItems}</ul>
  `;
}
