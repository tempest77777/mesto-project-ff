
// Функия удаления карточки из разметки
export function removeFromDisplay(card) {
    const display = document.querySelector('.places__list');
    display.removeChild(card);
}