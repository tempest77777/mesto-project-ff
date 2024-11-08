import { addNewCard, toggleLike_1 } from "./api";
import { checkImageInput, checkTextInput } from "./validation";
import { createCard } from "./card";
import { closePopup } from "./modal";

const saveButton = document.querySelector('.save__img'); // Кнопка "Сохранить"
const cardLinkField = document.querySelector('.popup__input_type_url'); // Поле ввода ссылки на картинку
const cardDescField = document.querySelector('.popup__input_type_card-name'); // Поле ввода названия картинки
const gal = document.querySelector('.places__list'); // Общий контейнер карточек
const errorMessage = document.querySelector('#add__card-error'); // Сообщение о ошибке валидации

// Функции для проверки корректности введенных значений
function isValidLink(inputValue) {
    return checkImageInput(inputValue);
}
function isValidDesc(inputValue) {
    return checkTextInput(inputValue);
}

// Функция для обновления состояния кнопки
function updateButtonState() {
    const linkIsValid = isValidLink(cardLinkField.value);
    const descIsValid = isValidDesc(cardDescField.value);
    console.log(saveButton.disabled)

// Переключение кнопки из активного состояния в неактивное и обратно, добавление сообщения о ошибке и стиля неактивной кнопки
    if (linkIsValid && descIsValid) {
        saveButton.disabled = false;
        saveButton.classList.remove('popup__button-disabled');
        errorMessage.textContent = '';

    } else {
        saveButton.disabled = true;
        saveButton.classList.add('popup__button-disabled')
        errorMessage.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы в поле ввода описания и ссылки на изображения с расширением jpg | jpeg | png | gif | bmp | webp'
    }
}

// Обработчики событий для каждого поля ввода
cardLinkField.addEventListener('input', updateButtonState);
cardDescField.addEventListener('input', updateButtonState);

// Функция добавления карточки
export function addCard() {

    // Если оба поля заполнены корректно, обновляем данные
        const getNewCard = async function(){
        if (isValidLink(cardLinkField.value) && isValidDesc(cardDescField.value)) {
            const newCard = await addNewCard(cardDescField.value, cardLinkField.value);
            if(newCard) {
                // Создаем карточку и получаем данные
                const cardElement = createCard(newCard, newCard.owner._id);
                const likeButton = cardElement.querySelector('.card__like-button');
                const cardId = newCard._id;
                const likeCount = cardElement.querySelector('.card__like-count');
                //Слушатель для добавления и снятия лайка
                likeButton.addEventListener('click', () => {
                    const isLiked = likeButton.classList.contains('card__like-button_is-active');
                    toggleLike_1(cardId, isLiked)
                    isLiked == true ? likeCount.textContent-- : likeCount.textContent++;
                    likeButton.classList.toggle('card__like-button_is-active');
                });
                // Добавляем карточку в разметку
                gal.prepend(cardElement);
            };
            //Закрываем попап
            closePopup(document.querySelector('.popup_type_new-card'));
            updateButtonState();
        ;}
    };
    // Добавляем новую карточку и сбрасываем поля
    getNewCard();
    cardDescField.value = '';
    cardLinkField.value = '';
};
updateButtonState();