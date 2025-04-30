import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  abrirPopup,
  fecharPopup,
  habilitarFechamentoAoClicarFora,
} from "./Util.js";

const gallery = document.querySelector(".gallery");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function adicionarCard(name, link) {
  const novoCard = new Card(name, link, "#cards");
  const cardElement = novoCard.getCardElement();
  gallery.prepend(cardElement);
}

initialCards.forEach((item) => {
  adicionarCard(item.name, item.link);
});

const botaoAbrirFormEditar = document.querySelector(".profile__edit");
const editarForm = document.querySelector(".edit__forms");
botaoAbrirFormEditar.addEventListener("click", () => {
  abrirPopup(editarForm);
});

const botaoFechaPerfil = document.querySelector(".close__image");
botaoFechaPerfil.addEventListener("click", () => {
  fecharPopup(editarForm);
});

habilitarFechamentoAoClicarFora(editarForm);

const botaoAbrirFormAdd = document.querySelector(".profile__add");
const formAdd = document.querySelector(".form__add");
botaoAbrirFormAdd.addEventListener("click", () => {
  abrirPopup(formAdd);
});

const fecharFormAdd = document.querySelector(".close__add-image");
fecharFormAdd.addEventListener("click", () => {
  fecharPopup(formAdd);
});

habilitarFechamentoAoClicarFora(formAdd);

const botaoFechaImg = document.querySelector(".close__popup-img");
const popupCard = document.querySelector(".card__popup");
botaoFechaImg.addEventListener("click", () => {
  fecharPopup(popupCard);
});

habilitarFechamentoAoClicarFora(popupCard);

const formProfile = document.querySelector(".form"); // formulário de perfil
const secondForm = document.querySelector(".second__form");
const inputNome = document.querySelector("#nome"); // input do nome
const inputBibliografia = document.querySelector("#bibliografia"); // input da biografia
const nomePerfil = document.querySelector(".profile__name"); // nome na tela
const bioPerfil = document.querySelector(".profile__paragraph"); // biografia na tela

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  nomePerfil.textContent = inputNome.value;
  bioPerfil.textContent = inputBibliografia.value;
  fecharPopup(editarForm);
  formProfile.reset();
  secondForm.reset();
});

secondForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = secondForm.querySelector("#titulo").value;
  const link = secondForm.querySelector("#link").value;
  adicionarCard(titulo, link);
  fecharPopup(formAdd);
  secondForm.reset();
});

const config = {
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_error",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
};

const addCardConfig = {
  ...config,
  inputSelector: ".second__item",
  submitButtonSelector: ".second__button",
};
const profileValidator = new FormValidator(config, formProfile);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(addCardConfig, formAdd);
addCardValidator.enableValidation();
