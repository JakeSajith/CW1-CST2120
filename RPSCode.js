// message displayer used to display messages //
function message_displayer(text, font, size, color, duration) {
    const textmodification = document.getElementById('message');
    textmodification.innerText = text;
    textmodification.style.fontFamily = font;
    textmodification.style.fontSize = size;
    textmodification.style.color = color;
    setTimeout(() => { //!!SET TIME OUT USES MILLISECONDS!!//
        textmodification.innerText = "";
    }, duration);
    }

//user data initialization //
const userdata = JSON.parse(localStorage.getItem("userdata")) || {};

    // sign up function
document.getElementById('SignupButton').addEventListener('click',function() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let emptyfields = [];
    if (!username) emptyfields.push("Username");
    if (!email) emptyfields.push("Email");
    if (!password) emptyfields.push("Password");
    if (emptyfields.length > 0) {
        let message = emptyfields.join(", ") + " cannot be empty";
        message_displayer(message, "Balsamiq Sans", "20px", "red", 3000);
        return;
    }

    if (username && email && password) { // if all fields are entered, create new properties
    userdata[email] = {
        username: username,
        password: password,
        global_score_point: 0
    };
    localStorage.setItem("userdata", JSON.stringify(userdata));
    message_displayer("Successfully Registered!","Balsamiq Sans","20px","green",3000)
    }
});


























// gamedata
let gameplay_participants = {
    user_name: "",
    score: 0,
};

// gamewinnerdata
let game_winner = {
    winner_name: "",
    winning_score: 0,
};

// gamemechanics
let game_mechanics = {
    timer: 0.0,
    powerups: {}
};

// leaderboard initialization
let leaderboard = {};
function matchresultdata() {
    leaderboard.push({
        username: game_winner.winner_name,
        user_score: game_winner.winning_score
    });
};
