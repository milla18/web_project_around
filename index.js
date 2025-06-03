import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import { Section } from "./components/Section.js";

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

// Instância do UserInfo para gerenciar os dados do perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__paragraph",
});

// Popup para exibir imagem ampliada
const popupWithImage = new PopupWithImage(".card__popup");
popupWithImage.setEventListeners();

// Função que será passada para o Card para abrir popup com imagem
function handleCardClick(data) {
  popupWithImage.open(data);
}

// Instância da Section para gerenciar a galeria
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".gallery" // seletor do container onde os cards vão ser inseridos
);

// Renderiza os cards iniciais
cardList.renderItems();

// Popup para editar perfil
const popupEditProfile = new PopupWithForm(".edit__forms", (formData) => {
  userInfo.setUserInfo({
    name: formData.nome,
    job: formData.bibliografia,
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

// Popup para adicionar novo local
const popupAddPlace = new PopupWithForm(".form__add", (formData) => {
  const newCardData = {
    name: formData.titulo,
    link: formData.link,
  };
  const card = new Card(newCardData, handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  popupAddPlace.close();
});
popupAddPlace.setEventListeners();

// Botão de editar perfil
const buttonEditProfile = document.querySelector(".profile__edit");
buttonEditProfile.addEventListener("click", () => {
  // Pega os dados atuais do usuário e pré-preenche o formulário
  const currentUser = userInfo.getUserInfo();
  document.getElementById("nome").value = currentUser.name;
  document.getElementById("bibliografia").value = currentUser.job;
  popupEditProfile.open();
});

// Botão para adicionar novo local
const buttonAddPlace = document.querySelector(".profile__add");
buttonAddPlace.addEventListener("click", () => {
  popupAddPlace.open();
});

const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_error",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
};

const formadd = {
  formSelector: ".second__form",
  inputSelector: ".second__item",
  submitButtonSelector: ".second__button",
  inactiveButtonClass: "form__button_error",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
};

const formvalidator = new FormValidator(
  formConfig,
  document.querySelector(".form")
);
const formaddvalidator = new FormValidator(
  formadd,
  document.querySelector(".second__form")
);

formvalidator.enableValidation();
formaddvalidator.enableValidation();
