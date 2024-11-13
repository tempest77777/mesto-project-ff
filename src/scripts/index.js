import { showPopup } from "./modal";
import {handleButtonClick} from "./modal.js";
import {
	getUserInfo,
	getInitialCards,
	toggleLike_1,
	updateUserInfo,
	updateAvatar,
} from "./api.js";
import {checkTextInput, checkImageInput} from "./validation";
import {closePopup} from "./modal";
import {renderCards} from "./card.js";
import "../pages/index.css";

const userData = await getUserInfo(); // Данные с сервера о пользователе
const cards = await getInitialCards(); // Данные с сервера о начальных карточка
const userName = document.querySelector(".profile__title"); // Имя пользователя
const userAbot = document.querySelector(".profile__description"); // Занятие пользователя
const profileName = document.querySelector(".popup__input_type_name"); // Поле ввода имени
const profileDesc = document.querySelector(".popup__input_type_description"); // Поле ввода описания
const currentName = document.querySelector(".profile__title"); // Имя
const currentDesc = document.querySelector(".profile__description"); // Описание
const saveButton = document.querySelector(".save__profile"); // Кнопка "Сохранить"
const msgError = document.querySelector("#description-error"); // Сообщение о ошибке
const avatarInput = document.querySelector(".popup__input_type_avatar-link"); // Поле ввода ссылки на аватар
const userAvatar = document.querySelector(".profile__image"); // Аватар пльзователя
const saveButtonAvatar = document.querySelector(".save__avatar"); // Кнопка "Сохранить"
const msgErrorAvatar = document.querySelector("#avatar-error"); // Сообщение о ошибке
// Функция отображения начальной страницы
function display(userData, cards) {
	userAvatar.style.backgroundImage = `url(${userData.avatar})`; //Установка аватара
	userName.textContent = userData.name; // Установка имени пользователя
	userAbot.textContent = userData.about; // Установка занятия пользователя

	//Функция рендеринга начальных карточек на странице
	renderCards(cards, userData._id);
	const likeButtons = document.querySelectorAll(".card__like-button"); // Кнопки лайков
	const likeCount = document.querySelectorAll(".card__like-count"); // Колличество лайков

	//Расстановка лайков на карточки и проверка лайкнутых
	likeButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			const currentCard = cards[index];
			const cardId = currentCard._id;
			const isLiked1 = button.classList.contains("card__like-button_is-active");
			toggleLike_1(cardId, isLiked1);
			console.log(isLiked1);
			isLiked1 == true
				? likeCount[index].textContent--
				: likeCount[index].textContent++;
			button.classList.toggle("card__like-button_is-active");
		});
	});
}

// Функция для проверки корректности введенных значений
function isValidInput(inputValue) {
	return checkTextInput(inputValue);
}
function isValidInputImage(inputValue) {
	return checkImageInput(inputValue);
}
// Функция для обновления состояния кнопки
function updateButtonState() {
	const nameIsValid = isValidInput(profileName.value);
	const descIsValid = isValidInput(profileDesc.value);
	// Если ОК
	if (nameIsValid && descIsValid) {
		saveButton.disabled = false;
		saveButton.classList.remove("popup__button-disabled");
		msgError.textContent = "";
		// Если не ОК
	} else {
		saveButton.disabled = true;
		saveButton.classList.add("popup__button-disabled");
		msgError.textContent =
			"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
	}
}

export function editProfile() {
	// Если оба поля заполнены корректно, обновляем данные
	if (isValidInput(profileName.value) && isValidInput(profileDesc.value)) {
		currentName.textContent = profileName.value;
		currentDesc.textContent = profileDesc.value;

		updateUserInfo(currentName.textContent, currentDesc.textContent);
		closePopup(document.querySelector(".popup_type_edit"));
	}
}

// Функция для обновления состояния кнопки
function updateButtonStateAvatar() {
	const linkIsValid = isValidInputImage(avatarInput.value);
	// Если ОК
	if (linkIsValid) {
		saveButtonAvatar.disabled = false;
		saveButtonAvatar.classList.remove("popup__button-disabled");
		msgErrorAvatar.textContent = "";
		// Если не ОК
	} else {
		saveButtonAvatar.disabled = true;
		saveButtonAvatar.classList.add("popup__button-disabled");
		msgErrorAvatar.textContent =
			"Разрешены только ссылки на изображения с расширением jpg | jpeg | png | gif | bmp | webp";
	}
}

// Функция обновления аватара
export function updateUserAvatar() {
	if (isValidInputImage(avatarInput.value)) {
		updateAvatar(avatarInput.value);
		userAvatar.style.backgroundImage = `url(${avatarInput.value})`;
		closePopup(document.querySelector(".popup_type_avatar"));
		avatarInput.value = "";
	}
	// Изначально проверяем состояние поля
	updateButtonStateAvatar();
}
// updateButtonStateAvatar();
// Начальная проверка
// updateButtonState();
display(userData, cards);
document.addEventListener("click", handleButtonClick);
// Добавление обработчиков событий для каждого поля ввода
profileName.addEventListener("input", updateButtonState);
profileDesc.addEventListener("input", updateButtonState);
// Обработчик событий для поля ввода
avatarInput.addEventListener("input", updateButtonStateAvatar);

// index.js

// Функция для открытия попапа изображения карточки
export function handleCardImageClick(cardData) {
	const popupImg = document.querySelector(".popup_type_image");
	const popupImage = popupImg.querySelector(".popup__image");
	const popupCaption = popupImg.querySelector(".popup__caption");

	// Устанавливаем URL изображения и описание
	popupImage.src = cardData.link;
	popupImage.alt = cardData.name;
	popupCaption.textContent = cardData.name;

	// Открываем попап
	showPopup(popupImg);
}
