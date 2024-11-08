

// Валидация текстового поля
export function checkTextInput(field) {
  return /^[A-Za-zА-Яа-яёЁ\s-]+$/.test(field);
};

// Валидация ссылки на изображение
export function checkImageInput(field) {
  return /\.(jpe?g|png|gif|bmp|webp)$/i.test(field);
};


//---------------------------------------------------------------------------
// // validation.js
// export function checkEditProfileFormValidity() {
//     // Реализация проверки формы редактирования профиля
//   }
  
//   export function checkNewCardFormValidity() {
//     // Реализация проверки формы новой карточки
//   }
  
//   // Проверка на соответствие регулярному выражению
//   function validateInput(inputElement, settings) {
//       const regex = /^[A-Za-zА-Яа-яёЁ\s-]+$/;
//       const { inputErrorClass, errorClass } = settings;
    
//       if (!regex.test(inputElement.value)) {
//         inputElement.classList.add(inputErrorClass);
//         inputElement.nextElementSibling.nextElementSibling.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
//       } else {
//         inputElement.classList.remove(inputErrorClass);
//         inputElement.nextElementSibling.textContent = "";
//       }
//     }
    
//     // Проверка валидности одного поля
//     function checkInputValidity(formElement, inputElement, settings) {
//       validateInput(inputElement, settings);
//       const isValid = inputElement.classList.contains(settings.inputErrorClass);
//       toggleButtonState(formElement, settings, isValid);
//     }
    
//     // Управление состоянием кнопки
//     function toggleButtonState(formElement, { submitButtonSelector, inactiveButtonClass }, isInvalid) {
//       const submitButton = formElement.querySelector(submitButtonSelector);
//       submitButton.disabled = isInvalid;
//       if (isInvalid) {
//         submitButton.classList.add(inactiveButtonClass);
//       } else {
//         submitButton.classList.remove(inactiveButtonClass);
//       }
//     }
    
//     // Добавление слушателей событий для формы
//     function setEventListeners(formElement, settings) {
//       const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
//       inputs.forEach(input => {
//         input.addEventListener('input', () => {
//           checkInputValidity(formElement, input, settings);
//         });
//       });
//     }
    
//     // Очистка валидации и ошибок перед открытием формы
//     function clearValidation(formElement, settings) {
//       const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
//       inputs.forEach(input => {
//           input.classList.remove(settings.inputErrorClass);
//           input.nextElementSibling.textContent = "";
//       });
//       toggleButtonState(formElement, settings, false); 
//   }
    
//     // Включение валидации для всех форм
//     function enableValidation({ formSelector, ...settings }) {
//       const forms = Array.from(document.querySelectorAll(formSelector));
//       forms.forEach(form => {
//         setEventListeners(form, settings);
//         clearValidation(form, settings);
//       });
//     }
    
//     export { enableValidation, clearValidation };
    


