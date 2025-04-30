export function abrirPopup(popup) {
  popup.style.display = "flex";
  document.querySelector(".content").classList.add("page__opacity");
  document.addEventListener("keydown", escFechaPopup);
}

export function fecharPopup(popup) {
  popup.style.display = "none";
  document.querySelector(".content").classList.remove("page__opacity");
  document.removeEventListener("keydown", escFechaPopup);
}

function escFechaPopup(event) {
  if (event.key === "Escape") {
    const popups = document.querySelectorAll(
      ".edit__forms, .form__add, .card__popup"
    );
    popups.forEach((popup) => {
      if (getComputedStyle(popup).display === "flex") {
        fecharPopup(popup);
      }
    });
  }
}
export function habilitarFechamentoAoClicarFora(popup) {
  document.addEventListener("mousedown", (event) => {
    if (event.target === popup && getComputedStyle(popup).display === "flex") {
      fecharPopup(popup);
    }
  });
}
