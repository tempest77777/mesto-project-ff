// index.js
import '../pages/index.css'; 
import { createCard } from './card.js';
import { showPopup, closeOpenedPopup, setupOverlayClose, closePopup } from './modals.js';
import { initialCards } from './cards.js';

// Установка аватара и логотипа
const logo = new URL('../images/logo.svg', import.meta.url);
const ava = new URL('../images/avatar.jpg', import.meta.url);
const avatar = document.querySelector('.profile__image');
avatar.style.backgroundImage = `url(${ava})`;
document.querySelector('.logo').src = logo;

 
// Элементы модальных окон и профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const formForEditProfile = popupEdit?.querySelector('.popup__form');
const formForNewCard = popupNewCard?.querySelector('.popup__form');
const nameInput = formForEditProfile?.querySelector('.popup__input_type_name');
const jobInput = formForEditProfile?.querySelector('.popup__input_type_description');
const placeNameInput = formForNewCard?.querySelector('.popup__input_type_card-name');
const linkInput = formForNewCard?.querySelector('.popup__input_type_url');
const cardContainer = document.querySelector('.places__list');
const openNewCardModalButton = document.querySelector('.profile__add-button');
const popupImage = popupImg?.querySelector('.popup__image');
const popupCaption = popupImg?.querySelector('.popup__caption');

// Функция для закрытия конкретной модалки
function closeModal(popup) {
    closePopup(popup);
}

// Обработчики закрытия для модалок
popupEdit?.querySelector('.popup__close')?.addEventListener('click', () => closeModal(popupEdit));
popupNewCard?.querySelector('.popup__close')?.addEventListener('click', () => closeModal(popupNewCard));
popupImg?.querySelector('.popup__close')?.addEventListener('click', () => closeModal(popupImg));

// Обработчики для модальных окон
document.querySelector('.profile__edit-button')?.addEventListener('click', () => {
    if (nameInput && jobInput && profileTitle && profileDesc) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileDesc.textContent;
        showPopup(popupEdit);
    }
});

openNewCardModalButton?.addEventListener('click', () => {
    showPopup(popupNewCard);
});


// Обработчики для форм
formForEditProfile?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (profileTitle && profileDesc && nameInput && jobInput) {
        profileTitle.textContent = nameInput.value;
        profileDesc.textContent = jobInput.value;
        closeModal(popupEdit); 
    }
});

formForNewCard?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (placeNameInput && linkInput) {
        const newCard = createCard({ name: placeNameInput.value, link: linkInput.value }, handleCardImageClick);
        cardContainer.prepend(newCard);
        closeModal(popupNewCard); 
        formForNewCard.reset();
    }
});

// Обработчики закрытия для модалок
setupOverlayClose(popupEdit);
setupOverlayClose(popupNewCard);
setupOverlayClose(popupImg);


// Рендер начальных карточек
initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, handleCardImageClick);
    cardContainer.append(cardElement);
});


// Функция для обработки клика по изображению карточки
function handleCardImageClick(cardData) {
    if (popupImage && popupCaption) {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        showPopup(popupImg);
    }
}



// Функция для рендера карточек
function renderCards(cards) {
    cards.forEach(cardData => {
        const cardElement = createCard(cardData, handleCardImageClick);
        cardContainer.append(cardElement);
    });
}

// Вызов функции для рендера начальных карточек
renderCards(initialCards);





