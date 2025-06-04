import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { api } from "../components/api.js";
// // import { createElement } from "react";

// const initialCards = [
//   {
//     name: "Vale de Yosemite",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
//   },
//   {
//     name: "Lago Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
//   },
//   {
//     name: "Montanhas Carecas",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
//   },
//   {
//     name: "Parque Nacional da Vanoise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
//   },
// ];

// // Instância do UserInfo para gerenciar os dados do perfil
// const userInfo = new UserInfo({
//   nameSelector: ".profile__name",
//   jobSelector: ".profile__paragraph",
// });

// // Popup para exibir imagem ampliada
// const popupWithImage = new PopupWithImage(".card__popup");
// popupWithImage.setEventListeners();

// // Função que será passada para o Card para abrir popup com imagem
// function handleCardClick(data) {
//   popupWithImage.open(data);
// }

// // Instância da Section para gerenciar a galeria
// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const card = new Card(item, handleCardClick);
//       const cardElement = card.generateCard();
//       cardList.addItem(cardElement);
//     },
//   },
//   ".gallery" // seletor do container onde os cards vão ser inseridos
// );

// // Renderiza os cards iniciais
// cardList.renderItems();

// // Popup para editar perfil
// const popupEditProfile = new PopupWithForm(".edit__forms", (formData) => {
//   userInfo.setUserInfo({
//     name: formData.nome,
//     job: formData.bibliografia,
//   });
//   popupEditProfile.close();
// });
// popupEditProfile.setEventListeners();

// // Popup para adicionar novo local

// // Botão de editar perfil
// const buttonEditProfile = document.querySelector(".profile__edit");
// buttonEditProfile.addEventListener("click", () => {
//   // Pega os dados atuais do usuário e pré-preenche o formulário
//   const currentUser = userInfo.getUserInfo();
//   document.getElementById("nome").value = currentUser.name;
//   document.getElementById("bibliografia").value = currentUser.job;
//   popupEditProfile.open();
// });

// // Botão para adicionar novo local

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

const editProfileImage = {
  formSelector: ".change__avatar",
  inputSelector: ".avatar__link",
  submitButtonSelector: ".edit__profile__image",
  inactiveButtonClass: "form__button_error",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
};

const formvalidator = new FormValidator(formConfig, document.querySelector(".form"));
const formaddvalidator = new FormValidator(formadd, document.querySelector(".second__form"));
const editProfileImg = new FormValidator(
  editProfileImage,
  document.querySelector(".change__avatar")
);

formvalidator.enableValidation();
formaddvalidator.enableValidation();
editProfileImg.enableValidation();

// const buttonEditProfile = document.querySelector(".profile__edit");
// buttonEditProfile.addEventListener("click", () => {
//   // Pega os dados atuais do usuário e pré-preenche o formulário
//   // const currentUser = userInfo.getUserInfo();
//   // document.getElementById("nome").value = currentUser.name;
//   // document.getElementById("bibliografia").value = currentUser.job;
//   popupEditProfile.open();
// });

const popupEditProfile = new PopupWithForm(".edit__forms");

popupEditProfile.setEventListeners();

const buttonAddPlace = document.querySelector(".profile__add");
buttonAddPlace.addEventListener("click", () => {
  popupAddPlace.open();
});

const popupAddPlace = new PopupWithForm(".form__add");

popupAddPlace.setEventListeners();

document.querySelector(".gallery").addEventListener("click", (event) => {
  if (event.target.classList.contains("card__trash")) {
    const card = event.target.closest(".card");
    const cardId = card.id;

    deletePopup.open(cardId);
  }
});

const popupEditProfileImage = new PopupWithForm(".edit__avatar");

const buttonEditProfileImage = document.querySelector(".update__image");
buttonEditProfileImage.addEventListener("click", () => {
  popupEditProfileImage.open();
});

popupEditProfileImage.setEventListeners();

document.querySelector(".gallery").addEventListener("click", (event) => {
  if (event.target.classList.contains("heart__white")) {
    const card = event.target.closest(".card");
    const cardId = card.id;

    api.like(token, cardId);
  }

  if (event.target.classList.contains("heart__black")) {
    const card = event.target.closest(".card");
    const cardId = card.id;

    api.disLike(token, cardId);
  }
});

const deletePopup = new PopupWithConfirmation(".popup__confirmation", (cardId, event) => {
  deleteCard(cardId);
});
deletePopup.setEventListeners();

//APIIIIIIIIIIII

const token = "9ee1a3b0-c7ef-4bd9-bb36-37f36ebcfdad";

const editProfileForm = document.querySelector(".form");
const addCard = document.querySelector(".second__form");
const changeAvatar = document.querySelector(".change__avatar");

function updateProfile(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const biografia = document.getElementById("bibliografia").value;

  api
    .updateUserProfile(token, nome, biografia)
    .then((userdata) => {
      document.querySelector(".profile__name").textContent = userdata.name;
      document.querySelector(".profile__paragraph").textContent = userdata.about;
      // document.querySelector(".profile__image").src = userdata.avatar;

      popupEditProfile.close();
    })
    .catch((err) => console.log("erro ao carregar os dados do forms", err));
}

function updateProfileImage(event) {
  event.preventDefault();

  const link = document.querySelector(".avatar__link").value;

  api
    .updateUserProfileImage(token, link)
    .then((userdata) => {
      document.querySelector(".profile__image").src = userdata.avatar;

      popupEditProfileImage.close();
    })
    .catch((err) => console.log("erro ao carregar os dados do forms", err));
}

api
  .getProfileBio(token)
  .then((profileData) => {
    const profileContent = document.querySelector(".profile__content");

    const bio = createBio(profileData);
    profileContent.appendChild(bio);
  })
  .catch((err) => console.error("Erro ao carregar o perfil:", err));

function createBio(data) {
  const profileImage = document.querySelector(".profile__image");
  profileImage.src = data.avatar;
  profileImage.alt = `Perfil`;

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("profile__content-title");

  const nameElement = document.createElement("h2");
  nameElement.classList.add("profile__name");
  nameElement.textContent = data.name || "Nome não Jean Jacques";

  const editButton = document.createElement("button");
  editButton.classList.add("profile__edit");
  editButton.type = "button";

  editButton.addEventListener("click", () => {
    popupEditProfile.open();
  });

  titleContainer.appendChild(nameElement);
  titleContainer.appendChild(editButton);

  const paragraph = document.createElement("p");
  paragraph.classList.add("profile__paragraph");
  paragraph.textContent = data.about || "explorador";

  const bio = document.createElement("div");
  bio.classList.add("profile__content");
  bio.appendChild(titleContainer);
  bio.appendChild(paragraph);

  return bio;
}

api
  .getInitialCards(token)
  .then((cards) => {
    const cardContainer = document.querySelector(".gallery");
    cards.forEach((card) => {
      const cardElement = createCardElement(card); // Cria o cartão
      cardContainer.appendChild(cardElement); // Adiciona o cartão ao container]
    });
  })
  .catch((err) => console.error("Erro ao carregar os cartões:", err));

function insertCard() {
  // event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const link = document.getElementById("link").value;

  api
    .insertCard(token, titulo, link)
    .then((userdata) => {
      document.querySelector("#titulo").textContent = userdata.name;
      document.querySelector("#link").textContent = userdata.link;

      popupEditProfile.close();
    })
    .catch((err) => console.log("erro ao carregar os dados do forms", err));
}

function deleteCard(cardId) {
  api
    .deleteCard(token, cardId)
    .then(() => {
      window.location.reload();
    })
    .catch((err) => console.log("Erro ao deletar o cartão:", err));
}

function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.id = card._id;

  // Trash button
  const cardTrash = document.createElement("button");
  cardTrash.classList.add("card__trash");

  // Image
  const cardImage = document.createElement("img");
  cardImage.classList.add("card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardContent = document.createElement("div");
  cardContent.classList.add("card__content");

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card__text");
  cardTitle.textContent = card.name;

  const cardHeart = document.createElement("button");
  cardHeart.setAttribute("type", "button");
  cardHeart.id = "heart";
  if (card.isLiked) {
    cardHeart.classList.add("heart__black");
  } else {
    cardHeart.classList.add("heart__white");
  }

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardHeart);

  cardElement.appendChild(cardTrash);
  cardElement.appendChild(cardImage);
  cardElement.appendChild(cardContent);

  return cardElement;
}

addCard.addEventListener("submit", insertCard);
editProfileForm.addEventListener("submit", updateProfile);
changeAvatar.addEventListener("submit", updateProfileImage);
