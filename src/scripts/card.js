import { closePopup} from "./modal.js";
import { toggleLike, add_new_card } from "./api";
import { handleCardImageClick } from "./index";

const cardLinkField = document.querySelector(".popup__input_type_url"); // Поле ввода ссылки на картинку
const cardDescField = document.querySelector(".popup__input_type_card-name"); // Поле ввода названия картинки
const gal = document.querySelector(".places__list"); // Общий контейнер карточек


// Функция для создания карточки на основе данных с сервера
export function createCard(cardData, userId) {
	const cardTemplate = document.querySelector("#card-template").content; // Находим шаблон для карточки
	const cardElement = cardTemplate.cloneNode(true); // Создаем элемент карточки путем копирования шаблона

	// Устанавливаем ID карточки -- OK
	const card = cardElement.querySelector(".places__item");
	card.id = cardData._id;

	// Устанавливаем изображение карточки -- OK
	const cardImage = cardElement.querySelector(".card__image");
	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardImage.addEventListener("click", (event) => {
		handleCardImageClick(cardData);
		const popUp = document.querySelector(".popup_type_image");
		popUp.addEventListener("click", (event) => {
			if (event.target.classList.contains("popup_type_image")) {
				closePopup(popUp);
			}
		});
	});

	// Устанавливаем заголовок карточки -- OK
	const cardTitle = cardElement.querySelector(".card__title");
	cardTitle.textContent = cardData.name;

	// Устанавливаем количество лайков и проверяем активный лайк-- OK
	const likeCount = cardElement.querySelector(".card__like-count");
	likeCount.textContent = cardData.likes?.length || 0;
	const likeButton = cardElement.querySelector(".card__like-button");
	likeButton.classList.toggle(
		"card__like-button_is-active",
		cardData.likes?.some((like) => like._id === userId)
	);

	// Устанавливаем иконку удаления карточки, если создатель мы
	const deleteButton = cardElement.querySelector(".card__delete-button");
	if (cardData.owner && cardData.owner._id === userId) {
		// deleteButton.addEventListener('click', () => openDeletePopup(cardElement, cardData._id));
	} else {
		deleteButton.remove();
	}
	// Возвращаем готовую карточку
	return cardElement;
}

// Функция добавления карточки
export function add_card(){
	add_new_card(cardDescField.value, cardLinkField.value).then((data) => {
		if(data){
			const userId = document.querySelector('.profile__info');
			const new_card = createCard(data, userId.id);
			const likeButton = new_card.querySelector(".card__like-button");
			const likeCount = new_card.querySelector(".card__like-count");
			const cardId = data._id;
			likeButton.addEventListener("click", () => {
				const isLiked = likeButton.classList.contains(
					"card__like-button_is-active"
				);
				toggleLike(cardId, isLiked);
				isLiked == true ? likeCount.textContent-- : likeCount.textContent++;
				likeButton.classList.toggle("card__like-button_is-active");
			});
			gal.prepend(new_card)
			cardDescField.value = "";
			cardLinkField.value = "";
			closePopup(document.querySelector(".popup_type_new-card"))
		};
	});
};

export function removeFromDisplay(card) {
	const display = document.querySelector(".places__list");
	display.removeChild(card);
};
