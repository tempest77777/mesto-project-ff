// card.js
export function createCard(cardData, handleCardImageClick) {
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

function handleDeleteCard(event) {
    const cardElement = event.target.closest('.card');
    if (cardElement) {
        cardElement.remove();
    }
}

function toggleLike(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_active');
}



