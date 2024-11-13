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
