export function message_displayer(text, font, size, color, duration) {
    const textmodification = document.getElementById('message');
    textmodification.innerText = text;
    textmodification.style.fontFamily = font;
    textmodification.style.fontSize = size;
    textmodification.style.color = color;
    setTimeout(() => {
        textmodification.innerText = "";
    }, duration);
}