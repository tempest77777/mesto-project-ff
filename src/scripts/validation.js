const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${settings.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${settings.errorClass}`);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${settings.inputErrorClass}`);
  errorElement.classList.remove(`${settings.errorClass}`);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage, settings);
  } else {
      inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
      hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList, settings)) {
      buttonElement.disabled = true;
  } else {
      buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
  const buttonElement = formElement.querySelector(`${settings.submitButtonSelector}`);

  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement, settings)
          toggleButtonState(inputList, buttonElement, settings);
      });
  });
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
  formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
  });
};

export const clearValidation = (inputList, buttonElement, form, settings) => {
  inputList.forEach((inputElement) => {
      hideInputError(form, inputElement, settings);
  })
  toggleButtonState(inputList, buttonElement, settings);
}