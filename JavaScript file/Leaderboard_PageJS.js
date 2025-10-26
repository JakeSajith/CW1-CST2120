document.getElementById("backtogamebutton").onclick = () => {
    window.location.href = "../html_files/Game_Page.html";
};

document.getElementById('logoutbutton').addEventListener('click',function() {
    localStorage.removeItem("Player");
    setTimeout(() =>{
        window.location.href = "../html_files/Home_Page.html"
    },2000)
});

const userdata = JSON.parse(localStorage.getItem("userdata")) || {};

const users_scores = Object.values(userdata).sort((a, b) => (b.global_score_point || 0) - (a.global_score_point || 0));

const tbody = document.getElementById("leaderboard_body");

// Fill table rows
users_scores.forEach((user, index) => {
    tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.username || "Guest"}</td>
            <td>${user.global_score_point || 0}</td>
        </tr>
    `;
});
