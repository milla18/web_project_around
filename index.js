function salvar(event) {
  alert("Alteração feita!");
  event.preventDefault();

  //   aqui estão pegando os valores do input do usuario
  let nome = document.querySelector("#nome");
  let bibliografia = document.querySelector("#bibliografia");

  document.querySelector(".profile__name").textContent = nome.value;
  document.querySelector(".profile__paragraph").textContent =
    bibliografia.value;

  fechar();
}

function editar() {
  document.querySelector(".edit__forms").style.display = "flex";
}

function fechar() {
  document.querySelector(".edit__forms").style.display = "none";
}
