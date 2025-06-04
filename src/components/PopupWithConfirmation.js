import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeletion) {
    super(popupSelector);
    this._handleDeletion = handleDeletion;
    this._confirmButton = this._popup.querySelector(".popup__confirm__deletion");
    this._cancelButton = this._popup.querySelector(".popup__cancel-button");
    this._targetCardId = null;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", (e) => {
      if (this._targetCardId) {
        this._handleDeletion(this._targetCardId);
        e.preventDefault();
        this.close();
      }
    });

    this._cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.close();
    });
  }

  open(cardId) {
    this._targetCardId = cardId;
    super.open();
  }
}
