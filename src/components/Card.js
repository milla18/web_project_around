export class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    // Atualizado para o seletor correto do template no HTML que você enviou
    this._templateSelector = "#cards";
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });

    this._likeButton.addEventListener("click", () => {
      const classes = this._likeButton.classList;
      console.log(classes);
      classes.contains("heart__white")
        ? classes.replace("heart__white", "heart__black")
        : classes.replace("heart__black", "heart__white");
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".heart__white");
    this._deleteButton = this._element.querySelector(".card__trash");
    this._cardTitle = this._element.querySelector(".card__text");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
