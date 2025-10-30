import { message_displayer } from '../JavaScript_file/Modules/Message_Displayer.js';
import { start_timer, reset_timer, end_timer} from '../JavaScript_file/Modules/Timer.js';

class PlayerClass {
    constructor(user_email, username, local_score_point) {
        this.user_email = user_email;
        this.username = username;
        this.local_score_point = local_score_point;
    }
}

//fetch playerdata  //
let PlayerData = JSON.parse(localStorage.getItem("Player"));
let Player;
if (PlayerData) {
    Player = new PlayerClass(PlayerData.user_email, PlayerData.username, PlayerData.local_score_point);
} else {
    Player = new PlayerClass("", "Guest", []);
}
document.getElementById("player_name").innerText = Player.username;

// initialise score 
let PlayerScore = 0;
let ComputerScore = 0;

// rounds intialize
let Round_Number = 0;      // Current round
const Total_Rounds = 5;    // Total rounds per game
let Round_Status = false; 


// total score displayer
if (Player.username === "Guest") {
    document.getElementById("global_score").innerText = "Scores are not counted!";
} else {
    const userdata = JSON.parse(localStorage.getItem("userdata")) || {};
    if (userdata[Player.user_email]) {
        const globalscore_display = userdata[Player.user_email].global_score_point || 0;
        document.getElementById("global_score").innerText = "Total Score: " + globalscore_display;
    }
}
// Update score display
function Score_Updater() {
    document.getElementById("player_score").innerText = "Score: " +PlayerScore;
    document.getElementById("computer_score").innerText = "Score: " +ComputerScore;
    if (Player.username === "Guest") {
        document.getElementById("logoutbutton").innerText = "Login";
    }
};


//logout 
document.getElementById('logoutbutton').addEventListener('click',function() {
    if (Player.username === "Guest") {
        setTimeout(() => {
            window.location.href = "../html_files/Home_Page.html";
        }, 500);
    } else {
        localStorage.removeItem("Player");
        message_displayer("Logged out. Redirecting..", "Balsamiq Sans", "20px", "blue", 2000);
        setTimeout(() => {
            window.location.href = "../html_files/Home_Page.html";
        }, 2500);
    }
});


// Player & bot choices
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");


// game controller
function PlayRound(PlayerChoice) {
    if (!Round_Status) {
        reset_timer();
        message_displayer("Press 'Start Round' to begin!", "Balsamiq Sans", "25px", "yellow", 3000);
        return;
    }
    end_timer();
    Round_Number++;
    document.getElementById("Round").innerText = "Round: " + Round_Number + " / " + Total_Rounds;

    const choices = ["rock", "paper", "scissors"];
    const ComputerChoice = choices[Math.floor(Math.random() * 3)];
    // visualise the choice
    const computer_buttons = document.getElementById("comp_" + ComputerChoice);
    computer_buttons.style.transform = "scale(1.17) rotate(2.5deg)";
    computer_buttons.style.filter = "drop-shadow(0 10px 25px #FFD70099)";

    setTimeout(() => {
        computer_buttons.style.transform = "";
        computer_buttons.style.filter = "drop-shadow(0 6px 15px black)";
    }, 1000);
    // visualise
    if (PlayerChoice === ComputerChoice) {
        message_displayer("Tie! No Points.", "Balsamiq Sans", "40px", "#FFFFE0", 3000);
    } else if (
        (PlayerChoice === "rock" && ComputerChoice === "scissors") ||
        (PlayerChoice === "paper" && ComputerChoice === "rock") ||
        (PlayerChoice === "scissors" && ComputerChoice === "paper")
    ) {
        message_displayer("You’ve Won!", "Balsamiq Sans", "40px", "#90ee90", 3000);
        PlayerScore++;
    } else {
        message_displayer("Computer Wins!", "Balsamiq Sans", "40px", "red", 3000);
        ComputerScore++;
    }
    if (Player) {
    Player.local_score_point.push(PlayerScore);
    localStorage.setItem("Player", JSON.stringify(Player));}
    Score_Updater();
    if (Round_Number >= Total_Rounds) {
        Round_Status = false;
        end_timer();
        End_Round();
        return;
    }
    reset_timer();
    start_timer(() => {
        message_displayer("Time's up! Bot wins the game!", "Balsamiq Sans", "30px", "orange", 2000);
        Round_Number = Total_Rounds;
        ComputerScore = PlayerScore + 9999999999;
        Score_Updater();
        setTimeout(() => {
            Round_Status = false;
            End_Round();
            }, 2000);
});
}

// End Round function 
function End_Round() {
    end_timer();
    // who won before resetting
    if (PlayerScore > ComputerScore) {
        if (Player.username !== "Guest") {
            const userdata = JSON.parse(localStorage.getItem("userdata")) || {};
            if (userdata[Player.user_email]) {
                if (!userdata[Player.user_email].global_score_point) {
                    userdata[Player.user_email].global_score_point = 0;
                }
                userdata[Player.user_email].global_score_point += PlayerScore;
                localStorage.setItem("userdata", JSON.stringify(userdata));
                const globalscore_display = userdata[Player.user_email].global_score_point;
                document.getElementById("global_score").innerText = "Total Score: " + globalscore_display;
                }                
            }
            message_displayer("Round ended. You've won!.", "Balsamiq Sans", "25px", "green", 3000);
    } else if (ComputerScore > PlayerScore) {
        message_displayer("Round ended. Bot wins!", "Balsamiq Sans", "25px", "red", 3000);
    } else {
        message_displayer("Round ended. It's a tie!", "Balsamiq Sans", "25px", "yellow", 3000);
    }
    setTimeout(() => {
        Round_Number = 0;
        PlayerScore = 0;
        ComputerScore = 0;
        Round_Status = false;
        document.getElementById("Round").innerText = "Round: 0 / " + Total_Rounds;
        message_displayer("Press start to begin again!", "Balsamiq Sans", "25px", "yellow", 3000);
        Score_Updater();
        reset_timer();
    }, 3000); 
}

// start round 
document.getElementById("start_round").addEventListener("click", () => {
      if (Round_Status) {
        message_displayer("A game is already in progress!", "Balsamiq Sans", "25px", "yellow", 3000);
        return;
    }
    Round_Status = true;
    reset_timer();
    start_timer(() => {

        message_displayer("Time's up! Bot wins the game!", "Balsamiq Sans", "30px", "orange", 2000);
        Round_Number = Total_Rounds;
        ComputerScore = PlayerScore + 9999999999;
        Score_Updater();
        setTimeout(() => {
            Round_Status = false;
            End_Round();
            }, 2000);
});

    message_displayer("New Round started!", "Balsamiq Sans", "25px", "yellow", 3000);
    if (Player) {
        Player.local_score_point = [];
    }
});



// events
rock.addEventListener("click", () => PlayRound("rock"));
paper.addEventListener("click", () => PlayRound("paper"));
scissors.addEventListener("click", () => PlayRound("scissors"));
Score_Updater();
document.getElementById("end_round").addEventListener("click", End_Round);



// fade controller for easing on buttons
let faded_choices = [
  document.getElementById("rock"),
  document.getElementById("paper"),
  document.getElementById("scissors")
];


// EXTRAS
// rock paper scissors keyboard shortcut
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "r") PlayRound("rock");
    if (key === "p") PlayRound("paper");
    if (key === "s") PlayRound("scissors");
});

faded_choices.forEach(choice => {
    choice.addEventListener("mouseover", () => {
        choice.style.opacity = "0.5";
    });
    choice.addEventListener("mouseout", () => {
        choice.style.opacity = "1"; 
    });
});


