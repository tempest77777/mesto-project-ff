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
    likeCount.textContent = item.likes?.length || 0;
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.classList.toggle(
        "card__like-button_is-active",
        item.likes?.some((like) => like._id === userId)
    );
    let isLiked = likeButton.classList.contains("card__like-button_is-active");
    likeButton.addEventListener("click", () => {
        likeCard(item._id, isLiked, likeCount, likeButton)
        isLiked = !isLiked;
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

export function likeCard(cardId, isLiked, likeCount, likeButton) {
    likeButton.disabled = true;
    toggleLike(cardId, isLiked)
        .then((like) => {
            isLiked === true ? likeCount.textContent-- : likeCount.textContent++;
            likeButton.classList.toggle("card__like-button_is-active");
        })
        .catch((err) => {})
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
        .catch((err) => {
            deleteButton.disabled = false;
        })
}