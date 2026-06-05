
document.getElementById("timestamp").value = new Date().toISOString();


const modalLinks = document.querySelectorAll(".modal-link");


modalLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const modalId = link.dataset.modal;
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.showModal();
    }
  });
});


const closeButtons = document.querySelectorAll("dialog button");

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});
