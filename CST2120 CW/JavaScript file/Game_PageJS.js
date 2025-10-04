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

//fetch playerdata  //
const Player = JSON.parse(localStorage.getItem("Player"));
//set playername to be username in player from homepage.js
let PlayerName;
if (Player) {
    PlayerName = Player.username;
} else {
    PlayerName = "Guest"; // Play as guest
}
document.getElementById("player_name").innerText = PlayerName;
// initialise score 
let PlayerScore = 0;
let ComputerScore = 0;
// player score
if (!Player) {
    document.getElementById("player_score").innerText = "Score: N/A (SIGN UP!)"
} else {
         document.getElementById("player_score").innerText = "Score: " + PlayerScore;
}
// Update score displays
function UpdateScores() {
    document.getElementById("player_score").innerText = "Score: " + PlayerScore;
    document.getElementById("computer_score").innerText = "Score: " + ComputerScore;
}

//logout 
document.getElementById('logoutbutton').addEventListener('click',function() {
    localStorage.removeItem("Player");
    message_displayer("Logged out. Redirecting..", "Balsamiq Sans", "20px", "blue", 3000);
    setTimeout(() =>{
        window.location.href = "../html_files/Home_Page.html"
    },4000)

});

// Player choices
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

// Computer choices
const cRock = document.getElementById("cRock");
const cPaper = document.getElementById("cPaper");
const cScissors = document.getElementById("cScissors");


function PlayRound(PlayerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const ComputerChoice = choices[Math.floor(Math.random() * 3)];
    // picked choice validation
    if (PlayerChoice === ComputerChoice) {
        message_displayer("Tie! No Points.", "Balsamiq Sans", "20px", "Yellow", 3000);
    } else if (
        (PlayerChoice === "rock" && ComputerChoice === "scissors") ||
        (PlayerChoice === "paper" && ComputerChoice === "rock") ||
        (PlayerChoice === "scissors" && ComputerChoice === "paper")
    ) {
        message_displayer("Youve Won!", "Balsamiq Sans", "20px", "green", 3000);
        PlayerScore++;
    } else {
        message_displayer("Computer Wins!", "Balsamiq Sans", "20px", "Red", 3000);
        ComputerScore++;
    }

    // Update scores each round
    UpdateScores();

    // Save local score to Player object
    if (Player) {
        Player.local_score_point.push(PlayerScore);
        localStorage.setItem("Player", JSON.stringify(Player));
    }
}

// events
rock.addEventListener("click", () => PlayRound("rock"));
paper.addEventListener("click", () => PlayRound("paper"));
scissors.addEventListener("click", () => PlayRound("scissors"));

// update scores each round
UpdateScores();

