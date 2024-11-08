import { handleCardImageClick } from './modal.js';
import { showPopup, closePopup } from './modal.js';

// Функция для создания карточки на основе данных с сервера
export function createCard(cardData, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    // Устанавливаем ID карточки -- OK
    const card = cardElement.querySelector('.places__item');
    card.id = cardData._id;

    // Устанавливаем изображение карточки -- OK
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardImage.addEventListener('click', (event) => {
        handleCardImageClick(cardData);
        const popUp = document.querySelector('.popup_type_image');
        popUp.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup_type_image')) {
                closePopup(popUp);
            }
        })
    });

    // Устанавливаем заголовок карточки -- OK
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardData.name;

    // Устанавливаем количество лайков и проверяем активный лайк-- OK
    const likeCount = cardElement.querySelector('.card__like-count');
    likeCount.textContent = cardData.likes?.length || 0;
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active', cardData.likes?.some(like => like._id === userId));

    // Устанавливаем иконку удаления карточки, если создатель мы
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (cardData.owner && cardData.owner._id === userId) {
        // deleteButton.addEventListener('click', () => openDeletePopup(cardElement, cardData._id));
    } else {
        deleteButton.remove();
    }
    // Возвращаем готовую карточку
    return cardElement;
}

// Функция рендеринга карточек на дисплее
export function renderCards(cards, userId) {
    const cardContainer = document.querySelector('.places__list');
    cardContainer.innerHTML = '';
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData, userId);
        cardContainer.append(cardElement);
    });
}

// Обработка кнопки лайка


// console.log(cardData.likes[0]?._id)
// if(cardData.likes?.some(like => like._id === userId)) {
//     likeButton.classList.add('card__like-button_is-active')
// }

// console.log(cardData.likes)
// likeButton.addEventListener('click', (event) => {
//     toggleLike(event, likeCount, cardData);
//     // toggleLike(cardData._id, false);
// });
// function openDeletePopup(cardElement, cardId) {
//     const deletePopup = document.querySelector('.popup_type_delete'); // Убедитесь, что у вас есть этот попап в HTML
//     showPopup(deletePopup); // Функция для открытия попапа

//     const confirmDeleteButton = deletePopup.querySelector('.popup__confirm-delete');
//     confirmDeleteButton.onclick = () => handleDeleteCard(cardElement, cardId, deletePopup);

//     // deletePopup.addEventListener('click', ()=> {
//     //     closePopup(deletePopup);
//     // })
// }




// export async function handleDeleteCard(cardElement, cardId, deletePopup) {
//     try {
//         const res = await fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/${cardId}`, {
//             method: 'DELETE',
//             headers: {
//                 authorization: token,
//             },
//         });

//         if (!res.ok) {
//             throw new Error(`Ошибка: ${res.status}`);
//         }

    
//         // Закрываем попап удаления
//         console.log('Закрываем попап после удаления', cardElement);
//         closePopup(deletePopup); //  попап для закрытия
//     } catch (error) {
//         console.error('Ошибка удаления карточки:', error);
//     }
// }