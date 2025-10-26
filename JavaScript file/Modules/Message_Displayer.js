let messageTimeout = null; 
export function message_displayer(text, font, size, color, duration) {
    const textmodification = document.getElementById('message')
    if (messageTimeout) {
        clearTimeout(messageTimeout);
    }
    textmodification.innerText = text;
    textmodification.style.fontFamily = font;
    textmodification.style.fontSize = size;
    textmodification.style.color = color;
    // new timeout ID
    messageTimeout = setTimeout(() => {
        textmodification.innerText = "";
        messageTimeout = null; // reset
    }, duration);
}