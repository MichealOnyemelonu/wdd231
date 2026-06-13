import { loadDevices } from './devices.js';
import { saveVisit } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {

  saveVisit();
  loadDevices();

  const btn = document.querySelector("#menuBtn");
  const menu = document.querySelector("#navMenu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
});