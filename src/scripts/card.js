import { handleCardImageClick } from './modal.js';
import { toggleLike, token } from './api.js'; 
import { showPopup, closePopup } from './modal.js';


export function createCard(cardData, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    // Устанавливаем изображение карточки
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardImage.addEventListener('click', () => handleCardImageClick(cardData));

    // Устанавливаем заголовок карточки
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardData.name;

    // Устанавливаем количество лайков
    const likeCount = cardElement.querySelector('.card__like-count');
    likeCount.textContent = cardData.likes?.length || 0;

    // Обработка кнопки лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_active', cardData.likes?.some(like => like._id === userId));
    likeButton.addEventListener('click', (event) => {
        toggleLike(event, likeCount, cardData);
        // toggleLike(cardData._id, false);
    });

    // Проверка прав на удаление карточки
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (cardData.owner && cardData.owner._id === userId) {
        deleteButton.addEventListener('click', () => openDeletePopup(cardElement, cardData._id));
    } else {
        deleteButton.remove();
    }

    return cardElement;
}

function openDeletePopup(cardElement, cardId) {
    const deletePopup = document.querySelector('.popup_type_delete'); // Убедитесь, что у вас есть этот попап в HTML
    showPopup(deletePopup); // Функция для открытия попапа

    const confirmDeleteButton = deletePopup.querySelector('.popup__confirm-delete');
    confirmDeleteButton.onclick = () => handleDeleteCard(cardElement, cardId, deletePopup);

    deletePopup.addEventListener('click', ()=> {
        closePopup(deletePopup);
    })
}


export function renderCards(cards, userId) {
    const cardContainer = document.querySelector('.places__list');
    cardContainer.innerHTML = '';
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData, userId);
        cardContainer.append(cardElement);
    });
}

export async function handleDeleteCard(cardElement, cardId, deletePopup) {
    try {
        const res = await fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: token,
            },
        });

        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }

    
        // Закрываем попап удаления
        console.log('Закрываем попап после удаления', cardElement);
        closePopup(deletePopup); //  попап для закрытия
    } catch (error) {
        console.error('Ошибка удаления карточки:', error);
    }
}