
import logoPath from '../images/logo.svg'; // Нужно??
import avatarPath from '../images/avatar.jpg'; // НУжно??
import { startDisplay } from './display.js';
import { handleButtonClick } from './modal.js';
import '../pages/index.css';



startDisplay()
document.addEventListener('click', handleButtonClick);








// --------------------------------------------------------------
// const formForEditProfile = popupEdit.querySelector('.popup__form');
// const nameInput = formForEditProfile.querySelector('.popup__input_type_name');
// const jobInput = formForEditProfile.querySelector('.popup__input_type_description');
// const formForNewCard = popupNewCard.querySelector('.popup__form');
// const placeNameInput = formForNewCard.querySelector('.popup__input_type_card-name');
// const linkInput = formForNewCard.querySelector('.popup__input_type_url');


// const userData = await getUserInfo();
// const cards = await getInitialCards();

// function display(userData, cards) {
//     renderCards(cards, userData._id);
//     const likeButtons = document.querySelectorAll('.card__like-button');
//     const likeCount = document.querySelectorAll('.card__like-count')
//     likeButtons.forEach((button, index) => {
//         button.addEventListener('click', () => {
//             const currentCard = cards[index];
//             const cardId = currentCard._id;
//             const isLiked1 = button.classList.contains('card__like-button_is-active');
//             toggleLike_1(cardId, isLiked1);
//             console.log(isLiked1);
//             isLiked1 == true ?likeCount[index].textContent-- : likeCount[index].textContent++;
//             button.classList.toggle('card__like-button_is-active');
//         });
//     });
// }

// display(userData, cards)

// document.addEventListener('DOMContentLoaded', startDisplay) // Отображаем страницу
 // Устанавливаем слушатель событий на страницу
// handleButtonClick()


// profileForm.addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log('click')
// })












// // Поп-апы (Открытие, закрытие)
// const handleButtonClick = (event) => {
//     // Получаем кнопку, которая была нажата
//     const button = event.target;
//     if (button.tagName != "BUTTON") return; // Если это не кнопка, прекращаем выполнение
//     console.log(button.classList)
//     console.log('click')
//     //Открываем

//     // Поп-апп добавления карточки
//     if (button.classList.contains('profile__add-button')) {
//         const addCardPop = document.querySelector('.popup_type_new-card');
//         showPopup(addCardPop);
//         console.log('click')
//     }
//     // Поп-апп изменения профиля
//     if (button.classList.contains('profile__edit-button')) {
//         const editProfilePop = document.querySelector('.popup_type_edit');
//         showPopup(editProfilePop);
//     }
//     // Поп-апп изменения аватара
//     if (button.classList.contains('profile-pen')) {
//         const editProfilePop = document.querySelector('.popup_type_avatar');
//         showPopup(editProfilePop);
//     }
  
//     //Закрытия поп-апов.
//     if(button.classList.contains('popup__close')) {
//         const rmPop = document.querySelector('.popup-opened');
//         console.log(rmPop)
//         console.log('ck')
//         closePopup(rmPop);
        
//         console.log('sa')
//     }
// }


// Логика смены информации о пользователе
// console.log(profileForm)
// profileForm.addEventListener('submit', event => {
//     event.preventDefault();
//     const userName = profileForm.name.value;
//     const description = profileForm.description.value;
//     console.log(userName, description)
// })


// let forms = document.querySelectorAll('.popup__form');
// forms.forEach((form) => {
//     // console.log(form);
//     if(form.name == 'avatar-update'){
//         const avatarButton = form.querySelector('.button');
//         // console.log(avatarButton)
//         const avatarInput = form.querySelector('.popup__input_type_avatar-link');
//         // console.log(avatarInput)

//     }

// })
// getBut()




// Производим рендеринг страницы на основе полученных данных
// renderCards(cards, userData._id);
// const likeButtons = document.querySelectorAll('.card__like-button');
// console.log(likeButtons)

// Логика постановки и снятия лайка с карточки
// likeButtons.forEach((button) => {
//     button.addEventListener('click',)
// })

// const likeButtons = document.querySelectorAll('.card__like-button');
// console.log(likeButtons)
// // Конфигурация для валидации форм
// const validationConfig = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible',
// };
  
//   enableValidation(validationConfig);




// // Обновление информации о пользователе
// profileForm.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const nameInput = profileForm.querySelector('.popup__input_type_name');
//     const aboutInput = profileForm.querySelector('.popup__input_type_description');
//   const name = nameInput.value;
//   const about = aboutInput.value;

//   try {
//     const updatedData = await updateUserInfo(name, about);
//     profileTitle.textContent = updatedData.name;
//     profileDesc.textContent = updatedData.about;
//     closePopup(popupEdit);
//   } catch (err) {
//     console.error('Ошибка обновления профиля:', err);
//   }
// });
  
//   // Включение валидации
//   enableValidation(validationConfig);
  
//   // Сброс валидации при открытии формы редактирования профиля
//   const editProfileButton = document.querySelector('.profile__edit-button');
//   editProfileButton.addEventListener('click', () => {
//     const profileForm = document.forms['edit-profile'];
//     clearValidation(profileForm, validationConfig);
//   });
  
//   // Сброс валидации при открытии формы добавления карточки
//   const openNewCardPopup = document.querySelector('.profile__add-button');
//   openNewCardPopup.addEventListener('click', () => {
//     newCardForm.reset(); 
//     console.log('saveNewCardButton', saveNewCardButton);
    
//     saveNewCardButton.textContent = 'Сохранить'; 
//     showPopup(popupNewCard);
//     clearValidation(newCardForm, validationConfig);
// });

// const logo = document.querySelector('.logo');

// if (logo) {
//     logo.src = logoPath;
//   }
  
//   if (avatar) {
//     avatar.style.backgroundImage = `url(${avatarPath})`;
//   }

  
//   function updateUserInfoOnPage(userData) {
//     profileTitle.textContent = userData.name;
//     profileDesc.textContent = userData.about;
//     avatar.style.backgroundImage = `url(${userData.avatar})`;
// }



// // Обработчик отправки формы редактирования профиля
// profileForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const nameInput = profileForm.querySelector('.popup__input_type_name');
//     const aboutInput = profileForm.querySelector('.popup__input_type_description');

    

//     // Получаем значения из формы
//     const name = nameInput.value;
//     const about = aboutInput.value;

//     // Обновляем данные пользователя на сервере
//     const updatedData = await updateUserInfo(name, about);

//     if (updatedData) {
//         // Обновляем данные профиля на странице
//         profileTitle.textContent = updatedData.name;
//         profileDesc.textContent = updatedData.about;

//         // Закрываем попап после обновления
//         closePopup(popupEdit);
//     }
// });

// // Обработчик для отправки формы добавления новой карточки

// newCardForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
//     const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

//     // Получаем значения из формы
//     const name = placeNameInput.value;
//     const link = placeLinkInput.value;

//     // Отправляем запрос на добавление новой карточки
//     const newCard = await addNewCard(name, link);
    

//     if (newCard) {
//         // Отображаем новую карточку на странице
//         const cardElement = createCard(newCard, newCard.owner._id);
//         document.querySelector('.places__list').prepend(cardElement);

//         // Сбрасываем форму и закрываем попап после успешного добавления
//         newCardForm.reset();
//         closePopup(popupNewCard);
//     }
// });

// // Функция для получения профиля пользователя почему-то fetch серого цвета ?

// // async function fetchUserProfile() {
// //     try {
// //         const res = await fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me', {
// //             headers: {
// //                 authorization: '8303b431-fff7-4eed-95da-47a7d0571887',
// //                 'Content-Type': 'application/json'
// //             }
// //         });

// //         if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

// //         const profileData = await res.json();

// //         // Обновляем элементы профиля на странице
// //         profileTitle.textContent = profileData.name;
// //         profileDesc.textContent = profileData.about;
// //         avatar.style.backgroundImage = `url(${profileData.avatar})`;
// //     } catch (error) {
// //         console.error('Ошибка загрузки профиля пользователя:', error);
// //     }
// // }

// // Валидация формы «Редактировать профиль» переделать ?


// function validateName(name) {
//     const regex = /^[A-Za-zА-Яа-яёЁ0-9\s\-]+$/;
//     return name.length >= 2 && name.length <= 40 && regex.test(name);
// }

// function validateDescription(description) {
//     const regex = /^[A-Za-zА-Яа-яёЁ0-9\s\-]+$/;
//     return description.length >= 2 && description.length <= 200 && regex.test(description);
// }

// // Обработка валидации переделать ?


// function checkEditProfileFormValidity() {
//     const isNameValid = validateName(nameInput.value);
//     const isJobValid = validateDescription(jobInput.value);
//     const saveButton = formForEditProfile.querySelector('.popup__button');

//     saveButton.disabled = !(isNameValid && isJobValid);
//       // Проверка поля имени
//         if(nameInput.value === ''){
//            nameInput.classList.add(validationConfig.inputErrorClass);
//            nameInput.nextElementSibling.textContent = "Вы пропустили это поле.";
//         } else if (!isNameValid) {
//             nameInput.classList.add(validationConfig.inputErrorClass);
//             nameInput.nextElementSibling.textContent = "Имя должно быть от 2 до 40 символов и содержать только буквы, дефисы и пробелы";
//         } else {
//             nameInput.classList.remove(validationConfig.inputErrorClass);
//             nameInput.nextElementSibling.textContent = "";
//         }

//     // Проверка поля описания
//     if(jobInput.value === ''){
//         jobInput.classList.add(validationConfig.inputErrorClass);
//         jobInput.nextElementSibling.textContent = "Вы пропустили это поле.";
//      } else if (!isJobValid) {
//         jobInput.classList.add(validationConfig.inputErrorClass);
//         jobInput.nextElementSibling.textContent = "Описание должно быть от 2 до 200 символов и содержать только буквы, дефисы и пробелы";
//     } else {
//         jobInput.classList.remove(validationConfig.inputErrorClass);
//         jobInput.nextElementSibling.textContent = "";
//     }
// }

// // Обработка ввода
// formForEditProfile.addEventListener('input', checkEditProfileFormValidity);
// formForEditProfile.addEventListener('submit', handleFormSubmitForEditProfilePopup);

// // Валидация формы «Новое место»
// function validatePlaceName(name) {
//     const regex = /^[A-Za-zА-Яа-яёЁ0-9\s\-]+$/;
//     return name.length >= 2 && name.length <= 30 && regex.test(name);
// }

// function validateLink(url) {
//     const regex = /^(ftp|http|https):\/\/[^ "]+$/;
//     return regex.test(url);
// }

// function checkNewCardFormValidity() {
//     const isPlaceNameValid = validatePlaceName(placeNameInput.value);
//     const isLinkValid = validateLink(linkInput.value);

//     const errorPlaceName = document.createElement('span');
//     const errorLink = document.createElement('span');

//     errorPlaceName.classList.add('popup__error');
//     errorLink.classList.add('popup__error');

//     if(placeNameInput.value === ''){
//         placeNameInput.classList.add(validationConfig.inputErrorClass);
//         errorPlaceName.textContent = "Вы пропустили это поле.";
//      } else  if (!isPlaceNameValid) {
//         errorPlaceName.textContent = 'Название должно быть от 2 до 30 символов и может содержать только буквы, дефисы и пробелы.';
//         placeNameInput.classList.add('popup__input_type_error');
//     } else {
//         placeNameInput.classList.remove('popup__input_type_error');
//     }

//     if(linkInput.value === ''){
//         linkInput.classList.add(validationConfig.inputErrorClass);
//         errorPlaceName.textContent = "Вы пропустили это поле.";
//      } else if (!isLinkValid) {
//         errorLink.textContent = 'Ссылка должна быть корректным URL.';
//         linkInput.classList.add('popup__input_type_error');
//     } else {
//         linkInput.classList.remove('popup__input_type_error');
//     }

//     saveNewCardButton.disabled = !(isPlaceNameValid && isLinkValid);

//     formForNewCard.append(errorPlaceName);
//     formForNewCard.append(errorLink);
// }

// // Функция добавления карточки на страницу
// function addCard(cardData) {
//     const cardContainer = document.querySelector('.places__list');
//     const cardElement = createCard(cardData); // Используем createCard для создания элемента карточки
//     cardContainer.prepend(cardElement); // Добавляем новую карточку в начало списка
// }

// // Обработка ввода в форме нового места
// formForNewCard.addEventListener('input', checkNewCardFormValidity);
// formForNewCard.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     const cardData = {
//         name: placeNameInput.value,
//         link: linkInput.value
//     };
//     addCard(cardData); // добавление новой карточки
//     closePopup(popupNewCard);
// });

// // закрываем попап 
// document.querySelectorAll('.popup').forEach((popup) => {
//     popup.addEventListener('click', (event) => {
//         if (event.target === popup) {
//             closePopup(popup);
//         }
//     });
// });

// function clearNewCardForm() {
//     placeNameInput.value = '';
//     linkInput.value = '';
//     saveNewCardButton.disabled = true; 
// }

// // Обработчик нажатия клавиши Escape
// function pressEscape(event) {
//     if (event.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup-opened');
//         if (openedPopup) {
//             closePopup(openedPopup);
//         }
//     }
// }


// // Открытие попапа «Редактировать профиль»
// editProfileButton.addEventListener('click', () => {
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileDesc.textContent;
//     showPopup(popupEdit);
// });

// // Открытие попапа «Новое место»
// openNewCardPopup.addEventListener('click', () => {
//     newCardForm.reset(); 
//     showPopup(popupNewCard);
//     clearValidation(newCardForm, validationConfig);
//     saveNewCardButton.textContent = 'Сохранить'; 
// });

// // Обработка закрытия попапов
// popupClose.forEach(close => {
    
//     close.addEventListener('click', () => {
//         closePopup(popupEdit);
//         closePopup(popupNewCard);
//         closePopup(popupImg);
//         closePopup(avatarPatch);
//     });
// });

// popupEdit.addEventListener('click', (event) => {
//     if (event.target === popupEdit) {
//         closePopup(popupEdit);
//     }
// });
// popupNewCard.addEventListener('click', (event) => {
//     if (event.target === popupNewCard) {
//         closePopup(popupNewCard);
//     }
// });
// popupImg.addEventListener('click', (event) => {
//     if (event.target === popupImg) {
//         closePopup(popupImg);
//     }
// });

// // 7. 8. Отображение количества лайков карточки  Функция создания карточки с логикой лайка и удаления 9. Постановка и снятие лайка
// // function createCard(cardData, userId) {
// //     const cardTemplate = document.querySelector('#card-template').content;
// //     const cardElement = cardTemplate.cloneNode(true);

// //     // Устанавливаем изображение карточки
// //     const cardImage = cardElement.querySelector('.card__image');
// //     cardImage.src = cardData.link;
// //     cardImage.alt = cardData.name;
// //     cardImage.addEventListener('click', () => handleCardImageClick(cardData));

// //     // Устанавливаем заголовок карточки
// //     const cardTitle = cardElement.querySelector('.card__title');
// //     cardTitle.textContent = cardData.name;

// //     // Устанавливаем количество лайков
// //     const likeCount = cardElement.querySelector('.card__like-count');
// //     likeCount.textContent = cardData.likes?.length;

// //     // 8. Удаление карточки  
// //     const deleteButton = cardElement.querySelector('.card__delete-button');
// //     if (cardData.owner && cardData.owner._id === userId) {
// //         deleteButton.addEventListener('click', () => openDeletePopup(cardElement, cardData._id));
// //     } else {
// //         deleteButton.remove(); 
// //     }

// //     console.log('cardData.likes', cardData.likes);
    
// //     // Обрабатываем кнопку лайка
// //     const likeButton = cardElement.querySelector('.card__like-button');
// //     likeButton.classList.toggle('card__like-button_active', cardData.likes?.some(like => like._id === userId));
// //     likeButton.addEventListener('click', (event) => {
// //         toggleLike(event, likeCount, cardData);
// //     });

// //     return cardElement;
// // }

// //Открытие попапа подтверждения удаления
// // function openDeletePopup(cardElement, cardId) {
// //     const deletePopup = document.querySelector('.popup_type_delete'); // Убедитесь, что у вас есть этот попап в HTML
// //     showPopup(deletePopup); // Функция для открытия попапа

// //     const confirmDeleteButton = deletePopup.querySelector('.popup__confirm-delete');
// //     confirmDeleteButton.onclick = () => handleDeleteCard(cardElement, cardId, deletePopup);

// //     deletePopup.addEventListener('click', ()=> {
// //         closePopup(deletePopup);
// //     })
// // }


// // function renderCards(cards, userId) {
// //     const cardContainer = document.querySelector('.places__list');
// //     cardContainer.innerHTML = ''; // Очищаем контейнер перед рендерингом
// //     cards.forEach((cardData) => {
// //         const cardElement = createCard(cardData, userId);
// //         cardContainer.append(cardElement);
// //     });
// // }

// //
// const profilePen = document.querySelector('.profile-pen')
// const avatarPatch = document.querySelector('.popup_type_avatar')
// profilePen.addEventListener('click', () => {
//     showPopup(avatarPatch)
// })

// //11. Улучшенный UX всех форм
// //1. Редактирование профиля
// profileForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const saveButton = profileForm.querySelector('.popup__button');
//     const originalButtonText = saveButton.textContent;
//     saveButton.textContent = 'Сохранение...';
//     saveButton.disabled = true;

//     const nameInput = profileForm.querySelector('.popup__input_type_name');
//     const aboutInput = profileForm.querySelector('.popup__input_type_description');
//     const name = nameInput.value;
//     const about = aboutInput.value;

//     const updatedData = await updateUserInfo(name, about);

//     if (updatedData) {
//         profileTitle.textContent = updatedData.name;
//         profileDesc.textContent = updatedData.about;
//         closePopup(popupEdit);
//     }

//     saveButton.textContent = originalButtonText;
//     saveButton.disabled = false;
// });
// //2. Добавление новой карточки
// newCardForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const saveButton = newCardForm.querySelector('.popup__button');
//     const originalButtonText = saveButton.textContent;
//     saveButton.textContent = 'Сохранение...';
//     saveButton.disabled = true;

//     const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
//     const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');
//     const name = placeNameInput.value;
//     const link = placeLinkInput.value;

//     const newCard = await addNewCard(name, link);

//     if (newCard) {
//         const cardElement = createCard(newCard, newCard.owner._id);
//         document.querySelector('.places__list').prepend(cardElement);
//         newCardForm.reset();
//         closePopup(popupNewCard);
//     }

//     saveButton.textContent = originalButtonText;
//     saveButton.disabled = false;
// });
// //3. Обновление аватара (если есть форма для аватара)
// avatarForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const saveButton = avatarForm.querySelector('.popup__button');
//     const originalButtonText = saveButton.textContent;
//     saveButton.textContent = 'Сохранение...';
//     saveButton.disabled = true;

//     const avatarUrl = avatarForm.querySelector('.popup__input_type_url').value;

//     const updatedAvatar = await updateAvatar(avatarUrl); 

//     if (updatedAvatar) {
//         avatar.style.backgroundImage = `url(${updatedAvatar.avatar})`;
//         closePopup(avatarPatch);
//     }

//     saveButton.textContent = originalButtonText;
//     saveButton.disabled = false;
// });
// //

// // 3. Загрузка информации о пользователе с сервера
//     //4 4. Загрузка карточек с сервера
//     document.addEventListener('DOMContentLoaded', async () => {
//         console.log('DOMContentLoaded');
        
//         try {
//             const [userData, cards] = await Promise.all([loadUserInfo(), fetchCards()]);

//             console.log('userdata', userData);
//             console.log('cards', cards);
            
    
//             // Отображаем информацию профиля
//             profileTitle.textContent = userData.name;
//             profileDesc.textContent = userData.about;
//             avatar.style.backgroundImage = `url(${userData.avatar})`;
    
//             // Отображаем карточки, передаем `userData._id` для управления удалением карточек
//             renderCards(cards, userData._id);
//         } catch (err) {
//             console.error('Ошибка загрузки данных:', err);
//         }
//     });

// //3. Загрузка информации о пользователе с сервера
// async function loadUserInfo() {
    //     const userData = await loadUserInfoFromServer()
    //     document.querySelector('.profile__title').textContent = userData.name;
    //     document.querySelector('.profile__description').textContent = userData.about;
    //     document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
    //     console.log(userData)
    //     return userData
    // }
    
//-----------------------------------------------------------------------------------------------------------------------------------------------------