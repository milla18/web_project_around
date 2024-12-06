document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  //   aqui estão pegando os valores do input do usuario
  let nome = document.querySelector("#nome");
  let bibliografia = document.querySelector("#bibliografia");

  document.querySelector(".profile__name").textContent = nome.value;
  document.querySelector(".profile__paragraph").textContent =
    bibliografia.value;

  closing();
});

function edit() {
  document.querySelector(".edit__forms").style.display = "flex";
}

function closing() {
  document.querySelector(".edit__forms").style.display = "none";
}

function openFormAdd() {
  document.querySelector(".form__add").style.display = "flex";
}

//fechar add
function closed() {
  document.querySelector(".form__add").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
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
      name: "Parque Nacional da Vanoise ",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
  ];
  initialCards.forEach(createCard);
  // variaveis dos cartoes
  let cardscontainer = document.querySelector(".gallery");
  // variaveis dos forms
  let formAdd = document.querySelector(".second__form");
  let form = document.querySelector(".form__add");

  //Background escuro no card hover

  cardscontainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("card__image")) {
      let imgSrc = event.target.src;
      selectImg.src = imgSrc;
      select.style.display = "flex";
      let card = event.target.closest(".card");
      let cardTitle = card.querySelector(".card__text").textContent;
      selectText.textContent = cardTitle;

      let selectValue = document.querySelector(".content");
      selectValue.classList.add("page__opacity");
    }
  });

  // fechamento do form e adicionado os cartoes
  function addCard(event) {
    event.preventDefault();
    let name = document.querySelector("#titulo").value;
    let link = document.querySelector("#link").value;
    if (name && link) {
      createCard({ name, link });
      formAdd.reset();
    }
    closed();
  }

  // codigo para clicar no +

  formAdd.addEventListener("submit", addCard);

  //lixeira
  cardscontainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("card__trash")) {
      let card = event.target.closest(".card");
      card.remove();
    }
  });

  //coração
  cardscontainer.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("heart__white") ||
      event.target.classList.contains("heart__black")
    ) {
      event.target.classList.toggle("heart__white");
      event.target.classList.toggle("heart__black");
    }
  }); //adicionando os cartoes
  function createCard(card) {
    let cardTemplate = document.querySelector("#cards").content;
    let cardscontainer = document.querySelector(".gallery");
    let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const cardTrash = cardElement.querySelector(".card__trash");
    const cardImage = cardElement.querySelector(".card__image");
    const cardText = cardElement.querySelector(".card__text");
    const cardHeart = cardElement.querySelector(".heart__white");

    cardTrash.setAttribute("role", "button");
    cardImage.src = card.link;
    cardImage.alt = card.name;

    cardText.textContent = card.name;
    cardscontainer.prepend(cardElement);
  }

  // variaveis do card popup img e title
  let select = document.querySelector(".card__popup");
  let selectImg = document.querySelector(".imagem__popup");
  let selectText = document.querySelector(".title___popup");
  // fazendo as modificaçoes de card popup img e title
  cardscontainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("card__image")) {
      let imgSrc = event.target.src;
      selectImg.src = imgSrc;
      select.style.display = "flex";
      let card = event.target.closest(".card");
      let cardTitle = card.querySelector(".card__text").textContent;
      selectText.textContent = cardTitle;
    }
  });
});

//adicionando os cartoes
function createCard(card) {
  let cardTemplate = document.querySelector("#cards").content;
  let cardscontainer = document.querySelector(".gallery");
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTrash = cardElement.querySelector(".card__trash");
  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");
  const cardHeart = cardElement.querySelector(".heart__white");

  cardTrash.setAttribute("role", "button");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardText.textContent = card.name;
  cardscontainer.prepend(cardElement);
}

// fechar img dos cartões
function closures() {
  document.querySelector(".card__popup").style.display = "none";
  document.querySelector(".content").classList.remove("page__opacity");
}

// esc e apertar fora
closingPopup({
  formSelector: ".edit__forms",
  formSelectorAdd: ".form__add",
  formSelectorCard: ".card__popup",
  form: ".form",
});

function closingPopup(config) {
  const formElement = document.querySelectorAll(config.form);
  const popups = [
    document.querySelector(config.formSelector),
    document.querySelector(config.formSelectorAdd),
    document.querySelector(config.formSelectorCard),
  ];

  // fechamento do poup o if para tirar o escuro da pag
  function closepopup(popup) {
    if (popup.classList.contains("card__popup")) {
      document.querySelector(".content").classList.remove("page__opacity");
    }
    popup.style.display = "none";
  }

  //validar o estilo e chamar fechamento do poup
  function closePopups() {
    popups.forEach((popup) => {
      if (popup && getComputedStyle(popup).display !== "none")
        closepopup(popup);
    });
  }

  // fechamento com esc
  function handleEscape(event) {
    if (event.key == "Escape" && isAnyPopupVisible()) closePopups();
  }

  // validaçao dos poup se for clicado do lado de fora
  function handleClickOutside(event) {
    const clickedInsideAnyPopup = Array.from(formElement).some((form) =>
      form.contains(event.target)
    );
    if (!clickedInsideAnyPopup && isAnyPopupVisible()) closePopups();
  }
  // Check if any popup is visible
  function isAnyPopupVisible() {
    return popups.some(
      (popup) => popup && getComputedStyle(popup).display === "flex"
    );
  }

  document.addEventListener("keydown", handleEscape);
  document.addEventListener("mousedown", handleClickOutside);
}
