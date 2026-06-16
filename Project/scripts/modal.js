const modal = document.createElement('dialog');
document.body.appendChild(modal);

export function openModal(device) {
  modal.innerHTML = `
    <h2>${device.name}</h2>
    <p>Brand: ${device.brand}</p>
    <p>Category: ${device.category}</p>
    <p>Price: $${device.price}</p>
    <button id="close-modal">Close</button>
  `;

  modal.showModal();
  modal.querySelector('#close-modal').addEventListener('click', () => modal.close());
}