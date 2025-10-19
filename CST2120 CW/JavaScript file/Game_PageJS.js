import { message_displayer } from '../JavaScript file/Modules/Message_Displayer.js';

class PlayerClass {
    user_email = "";
    username = "";
    local_score_point = [];
}

//fetch playerdata  //
let PlayerData = JSON.parse(localStorage.getItem("Player"));
let Player;
if (PlayerData) {
    Player = Object.assign(new PlayerClass(), PlayerData);
} else {
    Player = new PlayerClass();
    Player.username = "Guest";
}
document.getElementById("player_name").innerText = Player.username;

// initialise score 
let PlayerScore = 0;
let ComputerScore = 0;

// rounds intialize
let Round_Number = 0;      // Current round
const Total_Rounds = 5;    // Total rounds per game
let Round_Status = false; 


// Update score display
function Score_Updater() {
    document.getElementById("player_score").innerText = "Score: " +PlayerScore;
    document.getElementById("computer_score").innerText = "Score: " +ComputerScore;
    if (!Player) {
        document.getElementById("player_score").innerText = "Score: N/A (SIGN UP!)"
        document.getElementById("logoutbutton").innerText = "Login"
    }
};

//logout 
document.getElementById('logoutbutton').addEventListener('click',function() {
    localStorage.removeItem("Player");
    message_displayer("Logged out. Redirecting..", "Balsamiq Sans", "20px", "blue", 3000);
    setTimeout(() =>{
        window.location.href = "../html_files/Home_Page.html"
    },4000)
});

// Player & bot choices
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");


// game controller
function PlayRound(PlayerChoice) {
    if (!Round_Status) {
        message_displayer("Press 'Start Round' to begin!", "Balsamiq Sans", "25px", "yellow", 3000);
        return;
    }

    if (Round_Number >= Total_Rounds) {
        Round_Status = false;
        End_Round();
        return;
    }

    Round_Number++;
    document.getElementById("Round").innerText = "Round: " + Round_Number + " / " + Total_Rounds;

    const choices = ["rock", "paper", "scissors"];
    const ComputerChoice = choices[Math.floor(Math.random() * 3)];

    if (PlayerChoice === ComputerChoice) {
        message_displayer("Tie! No Points.", "Balsamiq Sans", "40px", "yellow", 3000);
    } else if (
        (PlayerChoice === "rock" && ComputerChoice === "scissors") ||
        (PlayerChoice === "paper" && ComputerChoice === "rock") ||
        (PlayerChoice === "scissors" && ComputerChoice === "paper")
    ) {
        message_displayer("You’ve Won!", "Balsamiq Sans", "40px", "green", 3000);
        PlayerScore++;
    } else {
        message_displayer("Computer Wins!", "Balsamiq Sans", "40px", "red", 3000);
        ComputerScore++;
    }
    if (Player) {
    Player.local_score_point.push(PlayerScore);
    localStorage.setItem("Player", JSON.stringify(Player));}
    Score_Updater();
}

// End Round function 
function End_Round() {
    // who won before resetting
    if (PlayerScore > ComputerScore) {
        if (Player) {
            const userdata = JSON.parse(localStorage.getItem("userdata")) || {};
            if (!userdata[Player.user_email].global_score_point) {
                userdata[Player.user_email].global_score_point = 0;
                }
                userdata[Player.user_email].global_score_point += PlayerScore;
                localStorage.setItem("userdata", JSON.stringify(userdata));
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
    }, 3000); 
}


// start round 
document.getElementById("start_round").addEventListener("click", () => {
      if (Round_Status) {
        message_displayer("A game is already in progress!", "Balsamiq Sans", "25px", "yellow", 3000);
        return;
    }
    Round_Status = true;
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

faded_choices.forEach(choice => {
    choice.addEventListener("mouseover", () => {
        choice.style.opacity = "0.5";
    });
    choice.addEventListener("mouseout", () => {
        choice.style.opacity = "1"; 
    });
});


