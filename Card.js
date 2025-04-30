import { abrirPopup } from "./Util.js";
export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    const cardElement = template.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => this._openPopup());
    this._trash.addEventListener("click", () => this._deleteCard());
    this._like.addEventListener("click", () => this._toggleLike());
  }

  _openPopup() {
    const popup = document.querySelector(".card__popup");
    const popupImage = popup.querySelector(".imagem__popup");
    const popupTitle = popup.querySelector(".title___popup");
    const content = document.querySelector(".content");

    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name;

    abrirPopup(popup);
  }

  _deleteCard() {
    this._element.remove();
  }

  _toggleLike() {
    this._like.classList.toggle("heart__white");
    this._like.classList.toggle("heart__black");
  }

  getCardElement() {
    this._element = this._getTemplate();

    this._trash = this._element.querySelector(".card__trash");
    this._image = this._element.querySelector(".card__image");
    this._text = this._element.querySelector(".card__text");
    this._like =
      this._element.querySelector(".heart__white") ||
      this._element.querySelector(".heart__black");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._text.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
