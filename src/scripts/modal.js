// Функция для открытия попапа
export function showPopup(popup) {
    popup.classList.add("popup-opened");
    document.addEventListener("keydown", pressEscape);
    document.addEventListener("click", overlayClose);
}

// Функция для закрытия попапа
export function closePopup(popup) {
    popup.classList.remove("popup-opened");
    document.removeEventListener("keydown", pressEscape);
    document.removeEventListener("click", overlayClose);
}

// Функция для закрытия попапа по кнопке ESC
function pressEscape(event) {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup-opened");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// Функция для закрытия попапа по оверлею
function overlayClose(event) {
    const openedPopup = document.querySelector(".popup-opened");
    if (event.target === openedPopup) {
        closePopup(openedPopup);
    }
}
