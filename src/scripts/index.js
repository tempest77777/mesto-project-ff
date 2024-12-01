import {createCard, likeCard, delCard} from "./card";
import {closePopup, showPopup} from "./modal";
import {addNewCard, changeUserAvatar, changeUserInfo, getUserInfoAndCards} from "./api";
import {clearValidation, enableValidation} from "./validation";
import "../pages/index.css";

const container = document.querySelector(".places__list"); // Общий контейнер карточек
// Информация о пользователе
const userName = document.querySelector(".profile__title"); // Имя пользователя
const userAbout = document.querySelector(".profile__description"); // Занятие пользователя
const userAvatar = document.querySelector(".profile__image"); // Аватар пользователя
// Popup - окно просмотра карточки
const popupImg = document.querySelector(".popup_type_image"); // Окно
const popupImage = popupImg.querySelector(".popup__image");  // Название
const popupCaption = popupImg.querySelector(".popup__caption"); // Описание
// Кнопки открытия popup
const openAddCardBtn = document.querySelector(".profile__add-button"); // Добавление карточки
const openEditProfileBtn = document.querySelector(".profile__edit-button"); // Редактирование профиля
const openEditAvatarBtn = document.querySelector(".profile-pen"); // Редактирование аватара
// Форма добавления карточки
const formAddCard = document.querySelector(".add_card"); // Форма
const inputNameCard = formAddCard.querySelector('.popup__input_type_card-name'); // Ввод названия
const inputLinkCard = formAddCard.querySelector('.popup__input_type_url');  // Ввод ссылки
const saveCardBtn = formAddCard.querySelector(".save__img"); // Кнопка сохранить
// Форма изменения профиля
const editProfileForm = document.querySelector(".edit_profile"); // Форма
const inputNameProfile = editProfileForm.querySelector(".popup__input_type_name"); // Ввод имя
const inputAboutProfile = editProfileForm.querySelector(".popup__input_type_description"); // Ввод описания
const saveProfileBtn = editProfileForm.querySelector(".save__profile"); // Кнопка сохранить
// Форма изменения аватар
const editAvatarForm = document.querySelector(".avatar_update"); // Форма
const inputLinkAvatar = editAvatarForm.querySelector(".popup__input_type_avatar-link"); // Ввод ссылки
const saveAvatarBtn = editAvatarForm.querySelector(".save__avatar"); // Кнопка сохранить
// Popup - окна
const popupAddCard = document.querySelector(".popup_type_new-card"); // Окно добавления карточки
const editProfilePopup = document.querySelector(".popup_type_edit");  // Окно редактирования профиля
const editAvatarPopup = document.querySelector(".popup_type_avatar");  // Окно редактирования аватара
// Кнопки закрытия popup - окон
const closeButtons = document.querySelectorAll(".popup__close"); // Все крестики

// Объект настроек для валидации
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
}

// Функция для открытия попапа изображения карточки
function handleImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    showPopup(popupImg);
}

// Слушатель открытия добавления карточки
openAddCardBtn.addEventListener("click", () => {
    formAddCard.reset()
    clearValidation([inputNameCard, inputLinkCard], saveCardBtn, formAddCard, settings)
    showPopup(popupAddCard);
})

// Слушатель открытия редактирования профиля
openEditProfileBtn.addEventListener("click", () => {
    inputNameProfile.value = userName.textContent;
    inputAboutProfile.value = userAbout.textContent;
    clearValidation([inputNameProfile, inputAboutProfile], saveProfileBtn, editProfileForm, settings)
    showPopup(editProfilePopup);
})

// Слушатель открытия редактирования аватара
openEditAvatarBtn.addEventListener("click", () => {
    editAvatarForm.reset();
    clearValidation([inputLinkAvatar], saveAvatarBtn, editAvatarForm, settings)
    showPopup(editAvatarPopup)
})

// Слушатель закрытия модальных окон
setCloseButton(closeButtons)

// Основные функции
// Функция для добавления новой карточки
function addNewCardToPage(name, link, userId, popup, form, button) {
    startSave(button)
    addNewCard(name, link)
        .then((newCard) => {
            container.prepend(createCard(newCard, userId, {handleImageClick, likeCard, delCard}))
            button.textContent = 'Сохранено'
            closePopup(popup);
        })
        .catch((err) => {
            button.textContent = 'Ошибка'
        })
        .finally(() => {
            endSave(button)
        })
}

// Функция обновления информации о пользователе
function updateUserInfo(name, about, popup, form, button) {
    startSave(button)
    changeUserInfo(name, about)
        .then(() => {
            userName.textContent = name;
            userAbout.textContent = about;
            button.textContent = 'Сохранено'
            closePopup(popup);
            form.reset()
        })
        .catch((err) => {
            button.textContent = 'Ошибка'
        })
        .finally(() => {
            endSave(button)
        })
}

// Функция для обновления аватара
function updateUserAvatar(link, popup, form, button) {
    startSave(button)
    changeUserAvatar(link)
        .then(() => {
            userAvatar.style.backgroundImage = `url(${link})`;
            button.textContent = 'Сохранено'
            closePopup(popup);
            form.reset()
        })
        .catch(() => {
            button.textContent = 'Ошибка';
        })
        .finally(() => {
            endSave(button)
        })
}

// Функция для старта рендеринга
function startRenderPage() {
    getUserInfoAndCards()
        .then((data) => {
            const userInfo = data[0];
            const cardData = data[1];
            userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
            userName.textContent = userInfo.name;
            userAbout.textContent = userInfo.about;
            cardData.forEach((card) => {
                container.append(createCard(card, userInfo._id, {handleImageClick, likeCard, delCard}))
            })

            formAddCard.addEventListener("submit", (event) => {
                event.preventDefault();
                addNewCardToPage(inputNameCard.value, inputLinkCard.value, userInfo._id, popupAddCard, formAddCard, saveCardBtn)
            })
            editProfileForm.addEventListener("submit", (event) => {
                event.preventDefault();
                updateUserInfo(inputNameProfile.value, inputAboutProfile.value, editProfilePopup, event.target, saveProfileBtn)
            })
            editAvatarForm.addEventListener("submit", (event) => {
                event.preventDefault();
                updateUserAvatar(inputLinkAvatar.value, editAvatarPopup, event.target, saveAvatarBtn)
            })
        })
        .catch(console.error)
}

// Дополнительные функции
// Доп функция для изменения кнопки в начале запроса
function startSave(button) {
    button.disabled = true;
    button.textContent = 'Сохранение...'
}

// Доп функция для изменения кнопки в конце запроса
function endSave(button) {
    setTimeout(() => {
        button.textContent = 'Cохранить'
        button.disabled = false
    }, 450)
}

// Функция установки слушателей кнопок закрытия модальных окон
function setCloseButton(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            closePopup(e.target.closest('.popup'));
        })
    })
}

// Запуск приложения
document.addEventListener("DOMContentLoaded", startRenderPage)
// Включаем валидацию - работает на все формы на странице.
enableValidation(settings);

