import { editProfile } from "./editProfile";
import { updateUserAvatar } from "./updateAvatar";
import { addCard } from "./addCard";
import {  removeFromDisplay } from "./deleteCards";
import { deleteCard } from "./api";

// Функция для открытия попапа
export function showPopup(popup) {
    popup.classList.add('popup-opened');
    document.addEventListener('keydown', pressEscape);
}
// Функция для закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup-opened');
    document.removeEventListener('keydown', pressEscape);
}
// Функция для закрытия попапа до кнопке ESC
function pressEscape(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}
 
// Функция для автоматической постановки слушателя событий на все карточки для открытия их попапов просмотра
export function handleCardImageClick(cardData) {
    const popupImg = document.querySelector('.popup_type_image');
    const popupImage = popupImg.querySelector('.popup__image');
    const popupCaption = popupImg.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    showPopup(popupImg);
}

// Обработчик событий на всю страницу
export const handleButtonClick = (event) => {
    // Получаем кнопку, которая была нажата
    const button = event.target;
    if (button.tagName != "BUTTON") return; // Если это не кнопка, прекращаем выполнение
    //Открываем
    // Кнопка открытия добавления карточки
    if (button.classList.contains('profile__add-button')) {
        const addCardPop = document.querySelector('.popup_type_new-card');
        showPopup(addCardPop);
    }
    // Кнопка открытия изменения профиля
    if (button.classList.contains('profile__edit-button')) {
        const editProfilePop = document.querySelector('.popup_type_edit');
        showPopup(editProfilePop);
    }
    // Кнопка открытия изменения аватара
    if (button.classList.contains('profile-pen')) {
        const editProfilePop = document.querySelector('.popup_type_avatar');
        showPopup(editProfilePop);
    }
    //Кнопка закрытия модальных окон
    if(button.classList.contains('popup__close')) {
        const rmPop = button.closest('.popup');
        closePopup(rmPop);
    }

    // Модальное окно удаления карточки - тут логика вся тут - от открытия до удаления
    if(button.classList.contains('card__delete-button')){
        const deletePop = document.querySelector('.popup_type_delete');
        const currentCard = button.closest('.places__item');
        const delButton = document.querySelector('.popup__confirm-delete');
        function delCard () {
            const id = currentCard.id;
            deleteCard(id)
            removeFromDisplay(currentCard);
            closePopup(deletePop);
            delButton.removeEventListener('click', delCard);
        };
        showPopup(deletePop);
        delButton.addEventListener('click', delCard);
    
    }


    // Кнопка "Сохранить" редактирвоания профиля
    if(button.closest('.save__profile')) {
        event.preventDefault();
        editProfile()
    }

    // Кнопка "Сохранить" редактирования аватара
    if(button.classList.contains('save__avatar')) {
        event.preventDefault();
        updateUserAvatar()
    }
    // Кнопка добавления карточки
    if(button.classList.contains('save__img')) {
        event.preventDefault();
        addCard()
    };
};
