import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._content = document.querySelector(".content");
    this._image = this._popup.querySelector(".imagem__popup");
    this._caption = this._popup.querySelector(".title___popup");
    this._closepopupImg = this._popup.querySelector(".close__popup-img");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}
