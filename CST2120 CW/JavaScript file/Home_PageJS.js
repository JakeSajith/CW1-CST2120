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

// sign up handler
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
    }
    else {
        if (userdata[email]) {
            message_displayer("Theres an account already..","Balsamiq Sans","20px","red",3000)
            return;
        }
        userdata[email] = {
            username: username,
            password: password,
            global_score_point: 0
        };
        localStorage.setItem("userdata", JSON.stringify(userdata));
        message_displayer("Successfully Registered!","Balsamiq Sans","20px","green",3000)
    }
});

// login handler
document.getElementById("LoginButton").addEventListener("click", function() {    
    const email_input = document.getElementById("email").value.trim();
    const password_input = document.getElementById("password").value.trim();
    const user_input = document.getElementById("username").value.trim();
    const userdata = JSON.parse(localStorage.getItem('userdata')) || {};
    if (userdata[email_input]) {
        if (userdata[email_input].password === password_input &&
            userdata[email_input].username === user_input) {
            message_displayer("Logged in successfully! Redirecting..", "Balsamiq Sans", "20px", "green", 3000);
            localStorage.setItem("Player",JSON.stringify({
                user_email: email_input,
                username: userdata[email_input].username,
                global_score_point: userdata[email_input].global_score_point,
                local_score_point: []
            }));
            setTimeout(() => {
                window.location.href = "../html_files/Game_Page.html";
                },2000); 
        } else {
            message_displayer("Login unsuccessful.", "Balsamiq Sans", "20px", "red", 3000);
        }
    } else {
        message_displayer("Account does not exist.", "Balsamiq Sans", "20px", "red", 3000);
    }
});



















