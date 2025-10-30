// redirect back to game
const PlayerData = JSON.parse(sessionStorage.getItem("Player"));
document.getElementById("backtogamebutton").onclick = () => {
    window.location.href = "../html_files/Game_Page.html";
};

// log out button
const logout_button = document.getElementById('logoutbutton');
if (!PlayerData || PlayerData.username === "Guest") {
    logout_button.innerText = "Login";
} else {
    logout_button.innerText = "Log Out";
}
// event listener
logout_button.addEventListener('click',function() {
    sessionStorage.removeItem("Player");
    setTimeout(() =>{
        window.location.href = "../html_files/Home_Page.html"
    },1500)
});

// userdata to compare scores
const userdata = JSON.parse(localStorage.getItem("userdata")) || {};

const users_scores = Object.values(userdata).sort((a, b) => (b.global_score_point || 0) - (a.global_score_point || 0));

const tbody = document.getElementById("leaderboard_body");

// Fill table rows
users_scores.forEach((user, index) => {
    tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.global_score_point || 0}</td>
        </tr>
    `;
});
