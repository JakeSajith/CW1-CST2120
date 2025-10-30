let interval = null;
let time = 3;

export function start_timer(onTimeUp) {
    if (interval) return;
    interval = setInterval(() => {
        time--;
        display_timer();
        
        if (time <= 0) {
            end_timer();
            onTimeUp();
        }
    }, 1000);
    
    display_timer();
}

export function reset_timer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    time = 3;
    display_timer();
}

export function end_timer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

function display_timer() {
    const display = document.getElementById("timer_display");
    if (!display) return;
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    display.innerText = `Time: ${mins}:${secs.toString().padStart(2, '0')}`;
    const percentage = time / 3;
    const red = Math.floor(255 * (1 - percentage));
    const green = Math.floor(255 * percentage);
    display.style.color = `rgb(${red}, ${green}, 0)`;
}