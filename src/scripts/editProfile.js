import { updateUserInfo } from "./api";
import { checkTextInput } from "./validation";
import { closePopup } from "./modal";

const profileName = document.querySelector('.popup__input_type_name'); // Поле ввода имени
const profileDesc = document.querySelector('.popup__input_type_description'); // Поле ввода описания
const currentName = document.querySelector('.profile__title'); // Имя
const currentDesc = document.querySelector('.profile__description'); // Описание
const saveButton = document.querySelector('.save__profile'); // Кнопка "Сохранить"
const msgError = document.querySelector('#description-error') // Сообщение о ошибке

// Функция для проверки корректности введенных значений
function isValidInput(inputValue) {
    return checkTextInput(inputValue);
}

// Функция для обновления состояния кнопки
function updateButtonState() {
    const nameIsValid = isValidInput(profileName.value);
    const descIsValid = isValidInput(profileDesc.value);
    // Если ОК
    if (nameIsValid && descIsValid) {
        saveButton.disabled = false;
        saveButton.classList.remove('popup__button-disabled');
        msgError.textContent = '';
        // Если не ОК
    } else {
        saveButton.disabled = true;
        saveButton.classList.add('popup__button-disabled')
        msgError.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
    }
}

// Добавление обработчиков событий для каждого поля ввода
profileName.addEventListener('input', updateButtonState);
profileDesc.addEventListener('input', updateButtonState);

export function editProfile() {
    // Если оба поля заполнены корректно, обновляем данные
    if (isValidInput(profileName.value) && isValidInput(profileDesc.value)) {
        currentName.textContent = profileName.value;
        currentDesc.textContent = profileDesc.value;

        updateUserInfo(currentName.textContent, currentDesc.textContent);
        closePopup(document.querySelector('.popup_type_edit'));
    }
}
// Начальная проверка
updateButtonState();