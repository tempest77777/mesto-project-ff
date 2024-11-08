// api.js

export const token = '8303b431-fff7-4eed-95da-47a7d0571887';
export const cohortId = 'wff-cohort-25';

// Конфигурация для всех запросов
const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
};

//  Запросы к серверу
export async function fetchData(url, options = {}) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}${url}`, {
      headers: {
          authorization: token,
          'Content-Type': 'application/json',
          ...options.headers
      },
      ...options
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .catch(err => console.error(err));
}

// Проверка ответа от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
  
// Функция для получения информации о пользователе
export const getUserInfo = async () => {
  try{
    const res = await fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    });
    const userData = await res.json()
    console.log("Информация о пользователе ->", userData)
    return userData;
   } catch(e) {
    console.log(e.message)
  }
};

// Функция для получения начальных карточек
export const getInitialCards = async () => {
  try {
    const res = await fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    });
    console.log(res)
    const initialCards = await res.json();
    console.log("Полученные карточки -> ", initialCards)
    return initialCards
  } catch(e) {
    console.log(e.message)
  }
};

// //Функция для обновления карточки
// export const updateCards = async (cardId) => {
//   try {
//     const res = await fetch(`${config.baseUrl}/cards/10`, {
//       headers: config.headers
//     });
//     const currentCard = await res.json();
//     console.log("Текущая карточка -> ", currentCard)
//     return currentCard
//   } catch(e) {
//     console.log(e.message)
//   }
// };

// try {
//   const url = `https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardData._id}`;
  
//   const res = await fetch(url, {
//       method,
//       headers: {
//           authorization: token,
//       }
//   });

// Функция для обновления информации о пользователе
// 5. Редактирование профиля Функция для обновления информации о пользователе
export const updateUserInfo = async (name, about) => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  });
  return checkResponse(res);
};


// Функция для добавления новой карточки
export const addNewCard = async (name, link) => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  });
  console.log('send')
  return checkResponse(res);
};

// Функция для удаления карточки
export const deleteCard = async (cardId) => {
  const res = await fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
  return checkResponse(res);
};

// Функция для постановки/снятия лайка
export const toggleLike_1 = async (cardId, isLiked) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  });
  return checkResponse(res);
};



export async function che(CardData) {
  const url = `https://nomoreparties.co/v1/${cohortId}/cards/likes/${CardData}`;
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        authorization: token
      }
    }
    )
    console.log(res)
  } catch (error) {
    console.log(e.message)
  }
}
// ---------------------------
// export async function toggleLike(event, likeCount, cardData) {
//   const likeButton = event.target;

//   // Определяем метод запроса в зависимости от текущего состояния лайка
//   const isLiked = likeButton.classList.contains('card__like-button_active');
//   const method = isLiked ? 'DELETE' : 'PUT';

//   // SVG для активного состояния (черное сердечко)
//   const activeSVG = `
//       <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M19.154 9.33822C21.294 7.19833 21.294 3.72364 19.154 1.60492C17.014 -0.534975 13.5392 -0.534975 11.3992 1.60492L10.361 2.66428L9.32276 1.62611C7.18277 -0.534975 3.70792 -0.534975 1.58911 1.60492C0.550891 2.64309 0 4.02026 0 5.48217C0 6.94408 0.572079 8.32124 1.58911 9.35941L10.361 18.1309L19.154 9.33822Z" fill="black"/>
//       </svg>
//   `;

//   // SVG для неактивного состояния (пустое сердечко)
//   const defaultSVG = `
//       <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M19.154 9.33822C21.294 7.19832 21.294 3.72364 19.154 1.60492C17.014 -0.534975 13.5392 -0.534975 11.3992 1.60492L10.361 2.66428L9.32276 1.62611C7.18277 -0.534975 3.70792 -0.534975 1.58911 1.60492C0.550891 2.64309 0 4.02026 0 5.48217C0 6.94408 0.572079 8.32124 1.58911 9.35941L10.361 18.1309L19.154 9.33822Z" fill="black"/>
//       </svg>
//   `;

//   try {
//       const url = `https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardData._id}`;
      
//       const res = await fetch(url, {
//           method,
//           headers: {
//               authorization: token,
//           }
//       });
      
//       if (!res.ok) {
//           throw new Error(`Ошибка: ${res.status}`);
//       }

//       // Получаем обновленные данные карточки
//       const updatedCardData = await res.json();

//       console.log('updatedCardData', updatedCardData);
      
//       // Обновляем количество лайков на основе данных от сервера
//       likeCount.textContent = updatedCardData.likes.length;

//       // Меняем иконку лайка в зависимости от нового состояния
//       if (updatedCardData.likes.some(like => like._id === cardData.owner_id)) {
//           likeButton.innerHTML = activeSVG;
//           likeButton.classList.add('card__like-button_active');
//       } else {
//           likeButton.innerHTML = defaultSVG;
//           likeButton.classList.remove('card__like-button_active');
//       }
//   } catch (error) {
//       console.error('Ошибка при изменении состояния лайка:', error);
//   }
// }


// Функция для обновления аватара
export const updateAvatar = async (avatarUrl) => {
  const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  });
  console.log('ava send')
  return checkResponse(res);
};
//-----------Не использовалось, удали если не надо

//3. Загрузка информации о пользователе с сервера
// export async function loadUserInfoFromServer() {
//   const userData = await fetchData('/users/me');
//   return userData;
// }



// 4. Загрузка карточек с сервера Функция для получения карточек 
// export async function fetchCards() {
//   return fetchData('/cards').then(cards => {
//      return cards
//   }).catch(err => {
//       console.error(err);
//   });
// }
  