// validando o formulario
function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputs = document.querySelectorAll(config.inputSelector);
  const formButton = document.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      //verificando se o input é valido
      const isValid = input.checkValidity();
      const errorElement = input.nextElementSibling;

      if (isValid) {
        //se for valido esconder a mensagem
        errorElement.textContent = "";
        errorElement.classList.remove(config.errorClass);
        input.classList.remove(config.inputErrorClass);
      } else {
        // se for invalido mostrar mensagem de erro

        const errorMessage = input.validationMessage;
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
        // desabilitar button do form
        formButton.classList.add(config.inactiveButtonClass);
        formButton.disabled = true;
      }

      // se todos inputs forem validos habiliar o button do form
      const isFormValid = formElement.checkValidity();
      if (isFormValid) {
        formButton.classList.remove(config.inactiveButtonClass);
        formButton.disabled = false;
      }
    });
  });
}
// Habilitando a validação chamando enableValidation()
// Valide todas as configurações do dois forms

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_error",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
});

enableValidation({
  formSelector: ".second__form",
  inputSelector: ".second__item",
  submitButtonSelector: ".second__button",
  inactiveButtonClass: "form__button_error",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
});
