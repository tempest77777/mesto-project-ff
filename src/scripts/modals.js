export function showPopup(popup) {
    popup.classList.add('popup-opened');
    document.addEventListener('keydown', handleEscapeClose);
}

export function closePopup(popup) {
    popup.classList.remove('popup-opened');
    document.removeEventListener('keydown', handleEscapeClose);
}

// Универсальная функция для закрытия только одного открытого модального окна
export function closeOpenedPopup() {
    const openPopup = document.querySelector('.popup-opened');
    if (openPopup) closePopup(openPopup);
}

// Закрытие окна при нажатии на Escape
function handleEscapeClose(event) {
    if (event.code === 'Escape') {
        closeOpenedPopup();
    }
}

// Установка закрытия по клику на оверлей
export function setupOverlayClose(popup) {
    popup.addEventListener('click', (event) => {
        if (event.target === popup) closePopup(popup);
    });
}
