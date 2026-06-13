export function setupModal(devices) {
  const modal = document.querySelector("#modal");

  document.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
      const device = devices.find(d => d.id == e.target.dataset.id);

      modal.innerHTML = `
      <div class="modal-content">
        <h2>${device.name}</h2>
        <p>${device.description}</p>
        <button id="close">Close</button>
      </div>`;
      modal.classList.remove("hidden");
    }

    if (e.target.id === "close") {
      modal.classList.add("hidden");
    }
  });
}