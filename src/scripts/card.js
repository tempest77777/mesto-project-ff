import {showPopup, closePopup} from "./modal.js";
import {addNewCard, toggleLike_1} from "./api";
import {checkImageInput, checkTextInput} from "./validation";
import { handleCardImageClick } from "./index";

const saveButton = document.querySelector(".save__img"); // Кнопка "Сохранить"
const cardLinkField = document.querySelector(".popup__input_type_url"); // Поле ввода ссылки на картинку
const cardDescField = document.querySelector(".popup__input_type_card-name"); // Поле ввода названия картинки
const gal = document.querySelector(".places__list"); // Общий контейнер карточек
const errorMessage = document.querySelector("#add__card-error"); // Сообщение о ошибке валидации
// Функция для создания карточки на основе данных с сервера
export function createCard(cardData, userId) {
	const cardTemplate = document.querySelector("#card-template").content;
	const cardElement = cardTemplate.cloneNode(true);

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

// Функция рендеринга карточек на дисплее
export function renderCards(cards, userId) {
	const cardContainer = document.querySelector(".places__list");
	cardContainer.innerHTML = "";
	cards.forEach((cardData) => {
		const cardElement = createCard(cardData, userId);
		cardContainer.append(cardElement);
	});
}

// Функции для проверки корректности введенных значений
function isValidLink(inputValue) {
	return checkImageInput(inputValue);
}
function isValidDesc(inputValue) {
	return checkTextInput(inputValue);
}

// Функция для обновления состояния кнопки
function updateButtonState() {
	const linkIsValid = isValidLink(cardLinkField.value);
	const descIsValid = isValidDesc(cardDescField.value);
	console.log(saveButton.disabled);

	// Переключение кнопки из активного состояния в неактивное и обратно, добавление сообщения о ошибке и стиля неактивной кнопки
	if (linkIsValid && descIsValid) {
		saveButton.disabled = false;
		saveButton.classList.remove("popup__button-disabled");
		errorMessage.textContent = "";
	} else {
		saveButton.disabled = true;
		saveButton.classList.add("popup__button-disabled");
		errorMessage.textContent =
			"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы в поле ввода описания и ссылки на изображения с расширением jpg | jpeg | png | gif | bmp | webp";
	}
}

// Обработчики событий для каждого поля ввода
cardLinkField.addEventListener("input", updateButtonState);
cardDescField.addEventListener("input", updateButtonState);

// Функция добавления карточки
export function addCard() {
	// Если оба поля заполнены корректно, обновляем данные
	const getNewCard = async function () {
		if (isValidLink(cardLinkField.value) && isValidDesc(cardDescField.value)) {
			const newCard = await addNewCard(
				cardDescField.value,
				cardLinkField.value
			);
			if (newCard) {
				// Создаем карточку и получаем данные
				const cardElement = createCard(newCard, newCard.owner._id);
				const likeButton = cardElement.querySelector(".card__like-button");
				const cardId = newCard._id;
				const likeCount = cardElement.querySelector(".card__like-count");
				//Слушатель для добавления и снятия лайка
				likeButton.addEventListener("click", () => {
					const isLiked = likeButton.classList.contains(
						"card__like-button_is-active"
					);
					toggleLike_1(cardId, isLiked);
					isLiked == true ? likeCount.textContent-- : likeCount.textContent++;
					likeButton.classList.toggle("card__like-button_is-active");
				});
				// Добавляем карточку в разметку
				gal.prepend(cardElement);
			}
			//Закрываем попап
			closePopup(document.querySelector(".popup_type_new-card"));
			updateButtonState();
		}
	};
	// Добавляем новую карточку и сбрасываем поля
	getNewCard();
	cardDescField.value = "";
	cardLinkField.value = "";
}
updateButtonState();

export function removeFromDisplay(card) {
	const display = document.querySelector(".places__list");
	display.removeChild(card);
}
