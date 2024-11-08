import { getUserInfo, getInitialCards, toggleLike_1} from './api.js';
import {renderCards } from './card.js';

const userData = await getUserInfo(); // Данные с сервера о пользователе
const cards = await getInitialCards(); // Данные с сервера о начальных карточка
const userName = document.querySelector('.profile__title'); // Имя пользователя
const userAbot = document.querySelector('.profile__description'); // Занятие пользователя
const userAvatar = document.querySelector('.profile__image'); // Аватар пользователя

// Функция отображения начальной страницы
function display(userData, cards) {
  userAvatar.style.backgroundImage = `url(${userData.avatar})`;  //Установка аватара
  userName.textContent = userData.name;  // Установка имени пользователя
  userAbot.textContent = userData.about;  // Установка занятия пользователя

  //Функция рендеринга начальных карточек на странице
  renderCards(cards, userData._id);
  const likeButtons = document.querySelectorAll('.card__like-button'); // Кнопки лайков
  const likeCount = document.querySelectorAll('.card__like-count'); // Колличество лайков

  //Расстановка лайков на карточки и проверка лайкнутых
  likeButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          const currentCard = cards[index];
          const cardId = currentCard._id;
          const isLiked1 = button.classList.contains('card__like-button_is-active');
          toggleLike_1(cardId, isLiked1);
          console.log(isLiked1);
          isLiked1 == true ?likeCount[index].textContent-- : likeCount[index].textContent++;
          button.classList.toggle('card__like-button_is-active');
      });
  });
}

// Запускатор для функции
export function startDisplay(){
  display(userData, cards)
}