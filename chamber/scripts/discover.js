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



import { places } from "../data/places.mjs";

const container = document.getElementById("cards");

places.forEach(place => {
    const card = document.createElement("div");

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.name}" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
    `;

    container.appendChild(card);
});


const messageDiv = document.getElementById("visitMessage");

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

let message = "";

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const diffTime = now - lastVisit;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        message = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${diffDays} days ago.`;
    }
}

messageDiv.textContent = message;


localStorage.setItem("lastVisit", now);