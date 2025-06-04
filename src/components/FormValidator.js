export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._config.errorClass);
      inputElement.classList.add(this._config.inputErrorClass);
    } else {
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
      inputElement.classList.remove(this._config.inputErrorClass);
    }
  }

  _toggleButtonState() {
    const formIsValid = this._inputList.every((input) => input.validity.valid);
    if (formIsValid) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    }
  }
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
