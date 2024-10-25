import { initialCards } from './cards';
import '../pages/index.css';

const logo = new URL('../images/logo.svg', import.meta.url);
const ava = new URL('../images/avatar.jpg', import.meta.url);

const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const openNewCardPopup = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const avatar = document.querySelector('.profile__image')
const log = document.querySelector('.logo')
log.src = logo;
avatar.style.backgroundImage = `url(${ava}`;

const formForEditProfile = popupEdit.querySelector('.popup__form');
const formForNewCard = popupNewCard.querySelector('.popup__form');

const popupImage = popupImg.querySelector('.popup__image');
const popupCaption = popupImg.querySelector('.popup__caption');

openNewCardPopup.addEventListener('click', () => {
    showPopup(popupNewCard)
});

function handleFormSubmitForEditProfilePopup(evt) {
    evt.preventDefault();
    const nameInput = formForEditProfile.querySelector('.popup__input_type_name');
    const jobInput = formForEditProfile.querySelector('.popup__input_type_description');
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileTitle.textContent = nameValue;
    profileDesc.textContent = jobValue;
    closePopup(popupEdit);
}

function handleFormSubmitForNewCardPopup(evt) {
    evt.preventDefault();
    document.querySelector('.places__list').innerHTML = ''
    const nameInput = formForNewCard.querySelector('.popup__input_type_card-name');
    const linkInput = formForNewCard.querySelector('.popup__input_type_url');
    const name = nameInput.value;
    const link = linkInput.value;

    initialCards.unshift({name, link});
    renderCards(initialCards);
    closePopup(popupNewCard);

    nameInput.value = '';
    linkInput.value = '';
}

formForEditProfile.addEventListener('submit', handleFormSubmitForEditProfilePopup);
formForNewCard.addEventListener('submit', handleFormSubmitForNewCardPopup);

function pressEscape(event) {
    if (event.code === 'Escape') {
        closePopup(popupEdit);
        closePopup(popupNewCard);
        closePopup(popupImg);
    }
}

function closePopup(popup) {
    popup.classList.remove('popup-opened')
    document.removeEventListener('keydown', pressEscape);
}

function showPopup(popup) {
    popup.classList.add('popup-opened')
    document.addEventListener('keydown', pressEscape);
}

editProfileButton.addEventListener('click', () => {
    const nameInput = formForEditProfile.querySelector('.popup__input_type_name');
    const jobInput = formForEditProfile.querySelector('.popup__input_type_description');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    showPopup(popupEdit);
});

popupClose.forEach(close => {
    close.addEventListener('click', () => {
        closePopup(popupEdit);
        closePopup(popupNewCard);
        closePopup(popupImg);
    });
});

popupEdit.addEventListener('click', (event) => {
    if (event.target === popupEdit) {
        closePopup(popupEdit);
    }
});
popupNewCard.addEventListener('click', (event) => {
    if (event.target === popupNewCard) {
        closePopup(popupNewCard);
    }
});
popupImg.addEventListener('click', (event) => {
    if (event.target === popupImg) {
        closePopup(popupImg);
    }
});


function handleCardImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    showPopup(popupImg);
}

function handleDeleteCard(event) {
    const cardElement = event.target.closest('.card');
    if (cardElement) {
        cardElement.remove();
    }
}

function toggleLike(event) {
    const likeButton = event.target;
    const isActive = likeButton.classList.toggle('card__like-button_active');

    // SVG для активного состояния (черное сердечко)
    const activeSVG = `
        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.154 9.33822C21.294 7.19833 21.294 3.72364 19.154 1.60492C17.014 -0.534975 13.5392 -0.534975 11.3992 1.60492L10.361 2.66428L9.32276 1.62611C7.18277 -0.534975 3.70792 -0.534975 1.58911 1.60492C0.550891 2.64309 0 4.02026 0 5.48217C0 6.94408 0.572079 8.32124 1.58911 9.35941L10.361 18.1309L19.154 9.33822Z" fill="black"/>
        </svg>
    `;

    // SVG для неактивного состояния (пустое сердечко)
    const defaultSVG = `
        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.154 9.33822C21.294 7.19832 21.294 3.72364 19.154 1.60492C17.014 -0.534975 13.5392 -0.534975 11.3992 1.60492L10.361 2.66428L9.32276 1.62611C7.18277 -0.534975 3.70792 -0.534975 1.58911 1.60492C0.550891 2.64309 0 4.02026 0 5.48217C0 6.94408 0.572079 8.32124 1.58911 9.35941L10.361 18.1309L19.154 9.33822Z" fill="black"/>
        </svg>
    `;

    // Меняем внутреннее содержимое кнопки лайка в зависимости от состояния
    likeButton.innerHTML = isActive ? activeSVG : defaultSVG;
}


function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardImage.addEventListener('click', () => handleCardImageClick(cardData));

    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', handleDeleteCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', toggleLike);

    return cardElement;
}

function renderCards(cards) {
    const cardContainer = document.querySelector('.places__list');
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        cardContainer.append(cardElement);
    });
}



renderCards(initialCards);


