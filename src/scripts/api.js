const token = '8303b431-fff7-4eed-95da-47a7d0571887';
const cohortId = 'wff-cohort-25';

// Конфигурация для всех запросов
const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
};

// Пути для URL
const paths = {
    userInfo: '/users/me',
    cards: '/cards',
    likes: '/cards/likes/',
    avatar: '/users/me/avatar'
};

// Методы для запроса
const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DEL: 'DELETE',
    PATCH: 'PATCH'
}

// Функция для получения информации о пользователе и списка карточек -- ok
export function get_user_and_cards() {
    const user_data_response = fetch(`${config.baseUrl}${paths.userInfo}`, {
        method: methods.GET,
        headers: config.headers, 
    })
    .then((res) => {
        if(!res.ok) {
            return false
        };
        return res.json();
    });
    const cards_data_response = fetch(`${config.baseUrl}${paths.cards}`, {
        method: methods.GET,
        headers: config.headers, 
    })
    .then((res) => {
        if(!res.ok) {
            return false
        };
        return res.json()
    });

    return Promise.all([user_data_response, cards_data_response])
};

// Функция для изменения аватара -- ok
export function change_avatar(link){
    const response = fetch(`${config.baseUrl}${paths.avatar}`, {
        method: methods.PATCH,
        headers: config.headers,
        body: JSON.stringify({ avatar: link })
    })
    .then((res) => {
        if (!res.ok) {
            console.log(`Error => ${res.statusText}`);
            return false;
        }
        return res.ok;
    })
    return response;
};

// Функция для изменения данных пользователя -- ok
export function change_user_info(name, about) {
    const response = fetch(`${config.baseUrl}${paths.userInfo}`, {
      method: methods.PATCH,
      headers: config.headers,
      body: JSON.stringify({ name, about })
  })
    .then((res) => {
        if (!res.ok) {
            console.log(`Error => ${res.statusText}`);
            return false;
        }
        return res.ok;
    })
    return response;
};

// Функция удаления карточки -- ok
export function deleteCard(card_id){
  const response = fetch(`${config.baseUrl}${paths.cards}/${card_id}`, {
    method: methods.DEL,
    headers: config.headers
})
  .then((res) => {
      if (!res.ok) {
          console.log(`Error => ${res.statusText}`);
          return false;
      }
      return res.ok;
  })
  return response;
};

// Функция для постановки/снятия лайка -- ok
export function toggleLike(cardID, isLiked){
  const response = fetch(`${config.baseUrl}${paths.likes}${cardID}`, {
    method: isLiked ? methods.DEL : methods.PUT,
    headers: config.headers
})
  .then((res) => {
      if (!res.ok) {
          console.log(`Error => ${res.statusText}`);
          return false;
      }
      return res.ok;
  })
  return response;
};

// Функция для добавления новой карточки -- ok
export function add_new_card(name, link) {
  const response = fetch(`${config.baseUrl}${paths.cards}`, {
    method: methods.POST,
    headers: config.headers,
    body: JSON.stringify({ name, link })
})
  .then((res) => {
      if (!res.ok) {
          console.log(`Error => ${res.statusText}`);
          return false;
      }
      return res.json();
  })
  return response;
};