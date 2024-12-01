import {toggleLike, deleteCard} from "./api";

const cardTemplate = document.querySelector("#card-template").content; // Находим шаблон для карточки

export function createCard(item, userId, {handleImageClick, likeCard, delCard}) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardImage.addEventListener("click", () => {
        handleImageClick(item);
    });
    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = item.name;
    const likeCount = cardElement.querySelector(".card__like-count");
    likeCount.textContent = item.likes?.length;
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.classList.toggle(
        "card__like-button_is-active",
        item.likes?.some((like) => like._id === userId)
    );
    likeButton.addEventListener("click", () => {
        likeCard(item._id, likeCount, likeButton)
    })
    const deleteButton = cardElement.querySelector(".card__delete-button");
    if (!(item.owner && item.owner._id === userId)) {
        deleteButton.remove();
    }
    deleteButton.addEventListener("click", () => {
        delCard(item._id, cardElement, deleteButton)
    })

    return cardElement;
}

export function likeCard(cardId, likeCount, likeButton) {
    let isLiked = likeButton.classList.contains("card__like-button_is-active");
    likeButton.disabled = true;
    toggleLike(cardId, isLiked)
        .then((like) => {
            likeButton.classList.toggle("card__like-button_is-active");
            likeCount.textContent = like.likes.length;
        })
        .catch(console.error)
        .finally(() => {
            likeButton.disabled = false;
        })
}

export function delCard(cardId, cardElement, deleteButton) {
    deleteButton.disabled = true;
    deleteCard(cardId)
        .then(() => {
            const currentCard = deleteButton.closest('.places__item');
            currentCard.remove();

        })
        .catch(console.error)       // *
        .finally(() => {
            deleteButton.disabled = false;
        })
}

/*
*   Я исправил замечание, которое Вы оставили, но у меня есть 1 вопрос. Зачем нужно переводить кнопку в активное
* состояние в блоке .finally, если при успешном ответе от сервера карточка удалится со страницы вместе с кнопкой,
* то есть активировать уже будет нечего. А если будет ошибка ответа от сервера, то кнопка станет вновь активной для
* повторной попытки (логика была такой)
*
*/