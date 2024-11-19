import { createCard } from "./card.js";
import { handleButtonClick, closePopup, showPopup } from "./modal.js";
import { toggleLike, change_avatar, get_user_and_cards, change_user_info } from "./api.js";
import "../pages/index.css";

const userName = document.querySelector(".profile__title"); // Имя пользователя
const userAbot = document.querySelector(".profile__description"); // Занятие пользователя
const userId = document.querySelector('.profile__info')
const profileName = document.querySelector(".popup__input_type_name"); // Поле ввода имени
const profileDesc = document.querySelector(".popup__input_type_description"); // Поле ввода описания
const currentName = document.querySelector(".profile__title"); // Имя
const currentDesc = document.querySelector(".profile__description"); // Описание
const avatarInput = document.querySelector(".popup__input_type_avatar-link"); // Поле ввода ссылки на аватар
const userAvatar = document.querySelector(".profile__image"); // Аватар пльзователя

// Функция отображения начальной страницы
function display() {
	get_user_and_cards().then((data) => {
		if(data[0] && data[1]) {
			// Устанавливаем информацию о пользователе
			userAvatar.style.backgroundImage = `url(${data[0].avatar})`; //Установка аватара
			userName.textContent = data[0].name; // Установка имени пользователя
			userAbot.textContent = data[0].about; // Установка занятия пользователя
			userId.id = data[0]._id;

			//Создаем и отображаем карточки
			const cardContainer = document.querySelector(".places__list"); // Находим основной контейнер под карточки
			cardContainer.innerHTML = ""; // Проверить???
			data[1].forEach((cardData) => {											// На основе данных с сервера
				const cardElement = createCard(cardData, data[0]._id);				// Создаем карточки
				cardContainer.append(cardElement);									// Добавляем карточку в контейнер
			});

			//Расстановка лайков на карточки и проверка лайкнутых
			const likeButtons = document.querySelectorAll(".card__like-button"); // находим кнопки лайков на карточках
			const likeCount = document.querySelectorAll(".card__like-count"); // находим колличество лайков на карточках
			likeButtons.forEach((button, index) => {
				button.addEventListener("click", () => {
					const currentCard = data[1][index];
					const cardId = currentCard._id;
					const isLiked1 = button.classList.contains("card__like-button_is-active");
					toggleLike(cardId, isLiked1);
					isLiked1 == true ? likeCount[index].textContent-- : likeCount[index].textContent++;
					button.classList.toggle("card__like-button_is-active");
				});
			});
		};
	});
};

// Функция обновления профиля
export function editProfile() {
	change_user_info(profileName.value, profileDesc.value)
	.then((res) => {
		if(res) {
			closePopup(document.querySelector(".popup_type_edit"));
			currentName.textContent = profileName.value;
			currentDesc.textContent = profileDesc.value;
			};
		});
};

// Функция обновления аватара
export function updateUserAvatar() {
	change_avatar(avatarInput.value);
	userAvatar.style.backgroundImage = `url(${avatarInput.value})`;
	closePopup(document.querySelector(".popup_type_avatar"));
	avatarInput.value = "";
};

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
};


display();
document.addEventListener("click", handleButtonClick);