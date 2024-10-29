// index.js
import '../pages/index.css'; 
import logoPath from '../images/logo.svg';
import { createCard } from './card.js';
import { showPopup, closeOpenedPopup, setupOverlayClose } from './modals.js';
import { initialCards } from './cards.js';
import avatarPath from '../images/avatar.jpg';


document.querySelector('.logo').src = logoPath;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatarPath})`;

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const formForEditProfile = popupEdit.querySelector('.popup__form');
const formForNewCard = popupNewCard.querySelector('.popup__form');
const nameInput = formForEditProfile.querySelector('.popup__input_type_name');
const jobInput = formForEditProfile.querySelector('.popup__input_type_description');
const placeNameInput = formForNewCard.querySelector('.popup__input_type_card-name');
const linkInput = formForNewCard.querySelector('.popup__input_type_url');
const cardContainer = document.querySelector('.places__list');
const openNewCardModalButton = document.querySelector('.profile__add-button');



// Установка аватара и логотипа
const logo = new URL('../images/logo.svg', import.meta.url);
const ava = new URL('../images/avatar.jpg', import.meta.url);
const avatar = document.querySelector('.profile__image');
avatar.style.backgroundImage = `url(${ava})`;
document.querySelector('.logo').src = logo;

// Обработчики для модальных окон
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    showPopup(popupEdit);
});

openNewCardModalButton?.addEventListener('click', () => {
    showPopup(popupNewCard);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    showPopup(popupNewCard);
});

// const editProfileButton = document.querySelector('.profile__edit-button');
// // const popupEdit = document.querySelector('.popup_type_edit');
// // const popupClose = document.querySelectorAll('.popup__close');
// // const profileTitle = document.querySelector('.profile__title');
// // const profileDesc = document.querySelector('.profile__description');
// // const popupNewCard = document.querySelector('.popup_type_new-card');
// // const popupImg = document.querySelector('.popup_type_image');
// const avatar = document.querySelector('.profile__image')
// const log = document.querySelector('.logo')
// log.src = logo;
// avatar.style.backgroundImage = `url(${ava}`;

// // const formForEditProfile = popupEdit.querySelector('.popup__form');
// // const formForNewCard = popupNewCard.querySelector('.popup__form');

// const popupImage = popupImg.querySelector('.popup__image');
// const popupCaption = popupImg.querySelector('.popup__caption');

// openNewCardPopup.addEventListener('click', () => {
//     showPopup(popupNewCard)
// });

// function handleFormSubmitForEditProfilePopup(evt) {
//     evt.preventDefault();
//     const nameInput = formForEditProfile.querySelector('.popup__input_type_name');
//     const jobInput = formForEditProfile.querySelector('.popup__input_type_description');
//     const nameValue = nameInput.value;
//     const jobValue = jobInput.value;
//     profileTitle.textContent = nameValue;
//     profileDesc.textContent = jobValue;
//     closePopup(popupEdit);
// }

// function handleFormSubmitForNewCardPopup(evt) {
//     evt.preventDefault();
//     document.querySelector('.places__list').innerHTML = ''
//     const nameInput = formForNewCard.querySelector('.popup__input_type_card-name');
//     const linkInput = formForNewCard.querySelector('.popup__input_type_url');
//     const name = nameInput.value;
//     const link = linkInput.value;

//     initialCards.unshift({name, link});
//     renderCards(initialCards);
//     closePopup(popupNewCard);

//     nameInput.value = '';
//     linkInput.value = '';
// }

// Обработчики для форм
formForEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closeOpenedPopup(); 
});

formForNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = createCard({ name: placeNameInput.value, link: linkInput.value }, handleCardImageClick);
    cardContainer.prepend(newCard);
    closeOpenedPopup(); 
    formForNewCard.reset();
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


// editProfileButton.addEventListener('click', () => {
//     const nameInput = formForEditProfile.querySelector('.popup__input_type_name');
//     const jobInput = formForEditProfile.querySelector('.popup__input_type_description');
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileDesc.textContent;
//     showPopup(popupEdit);
// });

// popupClose.forEach(close => {
//     close.addEventListener('click', () => {
//         closePopup(popupEdit);
//         closePopup(popupNewCard);
//         closePopup(popupImg);
//     });
// });

// popupEdit.addEventListener('click', (event) => {
//     if (event.target === popupEdit) {
//         closePopup(popupEdit);
//     }
// });
// popupNewCard.addEventListener('click', (event) => {
//     if (event.target === popupNewCard) {
//         closePopup(popupNewCard);
//     }
// });
// popupImg.addEventListener('click', (event) => {
//     if (event.target === popupImg) {
//         closePopup(popupImg);
//     }
// });


// Функция для обработки клика по изображению карточки
function handleCardImageClick(cardData) {
    const popupImage = popupImg.querySelector('.popup__image');
    const popupCaption = popupImg.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    showPopup(popupImg);
}

// setupOverlayClose(popupEdit);
// setupOverlayClose(popupNewCard);
// setupOverlayClose(popupImg);

// initialCards.forEach(cardData => {
//     const cardElement = createCard(cardData, handleCardImageClick);
//     cardContainer.append(cardElement);
// });



//     const likeButton = event.target;
//     const isActive = likeButton.classList.toggle('card__like-button_active');

//     // SVG для активного состояния (черное сердечко)
//     const activeSVG = `
//         <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M19.154 9.33822C21.294 7.19833 21.294 3.72364 19.154 1.60492C17.014 -0.534975 13.5392 -0.534975 11.3992 1.60492L10.361 2.66428L9.32276 1.62611C7.18277 -0.534975 3.70792 -0.534975 1.58911 1.60492C0.550891 2.64309 0 4.02026 0 5.48217C0 6.94408 0.572079 8.32124 1.58911 9.35941L10.361 18.1309L19.154 9.33822Z" fill="black"/>
//         </svg>
//     `;

//     // SVG для неактивного состояния (пустое сердечко)
//     const defaultSVG = `
//         <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M19.154 9.33822C21.294 7.19832 21.294 3.72364 19.154 1.60492C17.014 -0.534975 13.5392 -0.534975 11.3992 1.60492L10.361 2.66428L9.32276 1.62611C7.18277 -0.534975 3.70792 -0.534975 1.58911 1.60492C0.550891 2.64309 0 4.02026 0 5.48217C0 6.94408 0.572079 8.32124 1.58911 9.35941L10.361 18.1309L19.154 9.33822Z" fill="black"/>
//         </svg>
//     `;

//    
//     likeButton.innerHTML = isActive ? activeSVG : defaultSVG;
// }

// Вызов функции для рендера начальных карточек
renderCards(initialCards);

// Функция для рендера начальных карточек
function renderCards(cards) {
    cards.forEach(cardData => {
        const cardElement = createCard(cardData, handleCardImageClick);
        cardContainer.append(cardElement);
    });
}





