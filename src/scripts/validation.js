
// Валидация текстового поля
export function checkTextInput(field) {
  return /^[A-Za-zА-Яа-яёЁ\s-]+$/.test(field);
};

// Валидация ссылки на изображение
export function checkImageInput(field) {
  return /\.(jpe?g|png|gif|bmp|webp)$/i.test(field);
};


