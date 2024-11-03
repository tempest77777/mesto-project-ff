export function showPopup(popup) {
    popup.classList.add('popup-opened');
    document.addEventListener('keydown', pressEscape);
}

export function closePopup(popup) {
    popup.classList.remove('popup-opened');
    document.removeEventListener('keydown', pressEscape);
}

function pressEscape(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}
 
export function handleCardImageClick(cardData) {
    const popupImg = document.querySelector('.popup_type_image');
    const popupImage = popupImg.querySelector('.popup__image');
    const popupCaption = popupImg.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    showPopup(popupImg);
}

export function handleFormSubmitForEditProfilePopup(evt) {
    evt.preventDefault();
    const popupEdit = document.querySelector('.popup_type_edit');
    const profileTitle = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileTitle.textContent = nameValue;
    profileDesc.textContent = jobValue;
    closePopup(popupEdit);
}
