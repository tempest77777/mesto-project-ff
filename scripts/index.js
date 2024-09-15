// Функция для удаления карточки
function handleDeleteCard(event) {
    const cardElement = event.target.closest('.card');
    if (cardElement) {
        cardElement.remove();
    }
}

// Функция для создания карточки
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', handleDeleteCard);

    return cardElement;
}

// Функция для рендеринга карточек на странице
function renderCards(cards) {
    const cardContainer = document.querySelector('.places__list');
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        cardContainer.append(cardElement);
    });
}

// Рендерим карточки на странице
renderCards(initialCards);
