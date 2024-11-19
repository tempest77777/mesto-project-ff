// Валидация текстового поля
export function checkTextInput(field) {
  return /^[A-Za-zА-Яа-яёЁ\s-]+$/.test(field);
};

// Валидация ссылки на изображение
export function checkImageInput(field) {
  return /\.(jpe?g|png|gif|bmp|webp)$/i.test(field);
};

// Функция для валидации аватара
export function validate_avatar(){
  const avatar_error = document.getElementById('avatar-error');
  const avatar_input = document.querySelector('.popup__input_type_avatar-link');
  const avatar_button = document.querySelector('.save__avatar');

  const initial_value = avatar_input.value;

  if(!checkImageInput(initial_value)){
    avatar_button.classList.add('popup__button-disabled');
    avatar_error.textContent = 'Разрешены только ссылки на изображения с расширением jpg | jpeg | png | gif | bmp | webp';
    avatar_button.disabled = true;
  } else {
    avatar_button.classList.remove('popup__button-disabled');
    avatar_error.textContent = '';
    avatar_button.disabled = false;
  };
  avatar_input.addEventListener('input', () => {
    const value = avatar_input.value;
    if(!checkImageInput(value)){
      avatar_button.classList.add('popup__button-disabled');
      avatar_error.textContent = 'Разрешены только ссылки на изображения с расширением jpg | jpeg | png | gif | bmp | webp';
      avatar_button.disabled = true;
    } else {
      avatar_button.classList.remove('popup__button-disabled');
      avatar_error.textContent = '';
      avatar_button.disabled = false;
    };
  });
};

//Функция валидации редактирования профиля
export function validate_profile() {
  const profile_name_error = document.getElementById('name-error');
  const profile_descr_error = document.getElementById('description-error');
  const profile_name_input = document.querySelector('.popup__input_type_name');
  const profile_about_input = document.querySelector('.popup__input_type_description');
  const profile_button = document.querySelector('.save__profile');

  const initial_value_name = profile_name_input.value;
  const initial_value_about = profile_about_input.value;

  if (!checkTextInput(initial_value_name) || !checkTextInput(initial_value_about)) {
    profile_button.classList.add('popup__button-disabled');
    profile_name_error.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
    profile_descr_error.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
    profile_button.disabled = true;
  } else {
    profile_button.classList.remove('popup__button-disabled');
    profile_name_error.textContent = '';
    profile_descr_error.textContent = '';
    profile_button.disabled = false;
  }

  profile_name_input.addEventListener('input', () => {
    const value_name = profile_name_input.value;
    const value_desc = profile_about_input.value;

    if (!checkTextInput(value_name)) {
      profile_button.classList.add('popup__button-disabled');
      profile_name_error.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
      profile_button.disabled = true;
    } else {
      profile_button.classList.remove('popup__button-disabled');
      profile_name_error.textContent = '';
      profile_button.disabled = false;
    }

    if (!checkTextInput(value_desc)) {
      profile_button.classList.add('popup__button-disabled');
      profile_descr_error.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
      profile_button.disabled = true;
    } else {
      profile_button.classList.remove('popup__button-disabled');
      profile_descr_error.textContent = '';
      profile_button.disabled = false;
    }

    if (checkTextInput(value_name) && checkTextInput(value_desc)) {
      profile_button.classList.remove('popup__button-disabled');
      profile_button.disabled = false;
    }
  });

  profile_about_input.addEventListener('input', () => {
    const value_name = profile_name_input.value;
    const value_desc = profile_about_input.value;

    if (!checkTextInput(value_name)) {
      profile_button.classList.add('popup__button-disabled');
      profile_name_error.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
      profile_button.disabled = true;
    } else {
      profile_button.classList.remove('popup__button-disabled');
      profile_name_error.textContent = '';
      profile_button.disabled = false;
    }

    if (!checkTextInput(value_desc)) {
      profile_button.classList.add('popup__button-disabled');
      profile_descr_error.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
      profile_button.disabled = true;
    } else {
      profile_button.classList.remove('popup__button-disabled');
      profile_descr_error.textContent = '';
      profile_button.disabled = false;
    }

    if (checkTextInput(value_name) && checkTextInput(value_desc)) {
      profile_button.classList.remove('popup__button-disabled');
      profile_button.disabled = false;
    }
  });
};

// Функция валидации добавления карточки
export function validate_add_card() {
  const card_button = document.querySelector('.save__img');
  const card_name_error = document.getElementById('add_card_name');
  const card_link_error = document.getElementById('add_card_link');
  const card_name_input = document.querySelector('.popup__input_type_card-name');
  const card_link_input = document.querySelector('.popup__input_type_url');

  function updateValidation() {
    const value_name = card_name_input.value;
    const value_link = card_link_input.value;

    let isNameValid = checkTextInput(value_name);
    let isLinkValid = checkImageInput(value_link);

    if (isNameValid && isLinkValid) {
      card_button.classList.remove('popup__button-disabled');
      card_button.disabled = false;
      card_name_error.textContent = '';
      card_link_error.textContent = '';
    } else {
      card_button.classList.add('popup__button-disabled');
      card_button.disabled = true;

      if (!isNameValid) {
        card_name_error.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
      } else {
        card_name_error.textContent = '';
      }

      if (!isLinkValid) {
        card_link_error.textContent = 'Разрешены только ссылки на изображения с расширением jpg | jpeg | png | gif | bmp | webp';
      } else {
        card_link_error.textContent = '';
      }
    }
  }

  updateValidation();

  card_name_input.addEventListener('input', updateValidation);
  card_link_input.addEventListener('input', updateValidation);
}
