export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.style.display = "flex"; // abre o popup
    this._content.classList.add("page__opacity");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.style.display = "none"; // fecha o popup
    this._content.classList.remove("page__opacity");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      // se clicar no botão de fechar ou na sombra, fecha o popup
      if (
        event.target.classList.contains("close__image") ||
        event.target.classList.contains("close__add-image") ||
        event.target === this._popup ||
        event.target === this._closepopupImg
      ) {
        this.close();
      }
    });
  }
}
