const token = '8303b431-fff7-4eed-95da-47a7d0571887';
const cohortId = 'wff-cohort-25';

// Функция проверки ответа от сервера
function checkResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

// Функция конфигурации запроса и выполнение запроса в зависимости от action
function request(action, param1, param2) {
    const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;
    let url;
    let method;
    let body;
    let options = {
        authorization: token,
        'Content-Type': 'application/json'
    };
    if (action === 'optionChangeUserInfo'){
        url = `${baseUrl}/users/me`;
        method = 'PATCH';
        body = JSON.stringify({name: param1, about: param2});
    }
    if (action === 'optionChangeAvatar'){
        url = `${baseUrl}/users/me/avatar`;
        method = 'PATCH';
        body = JSON.stringify({avatar: param1});
    }
    if (action === 'optionAddCard'){
        url = `${baseUrl}/cards`
        method = 'POST';
        body = JSON.stringify({name: param1, link: param2});
    }
    if (action === 'optionDeleteCard'){
        url = `${baseUrl}/cards/${param1}`
        method = 'DELETE';
    }
    if (action === 'optionLikeCard'){
        url = `${baseUrl}/cards/likes/${param1}`;
        // param2 ? method = 'DELETE' : 'PUT';
        param2 ? method = 'DELETE' : method = 'PUT';
    }
    if (action === 'optionGetUserInfo'){
        url = `${baseUrl}/users/me`;
    }
    if (action === 'optionGetCards'){
        url = `${baseUrl}/cards`;
    }
    options = {method: method, headers: options, body: body};
    return (
        fetch(url, options).then(checkResponse)
    );
}

// Функция для получения начальных данных (информация о пользователе и список начальных карточек)
export function getUserInfoAndCards() {
    const userInfo = request('optionGetUserInfo');
    const cardData = request('optionGetCards');
    return Promise.all([userInfo, cardData]);
}

// Функция для изменения информации о пользователе
export function changeUserInfo(name, about) {
    return request('optionChangeUserInfo', name, about);
}

// Функция для изменения аватара пользователя
export function changeUserAvatar(avatarLink) {
    return request('optionChangeAvatar', avatarLink);
}

// Функция для добавления новой карточки
export function addNewCard(name, link) {
    return request('optionAddCard', name, link);
}

// Функция удаления карточки
export function deleteCard(cardId) {
    return request('optionDeleteCard', cardId);
}

// Функция постановки снятия лайка
export function toggleLike(cardId, isLiked) {
    return request('optionLikeCard', cardId, isLiked)
}
