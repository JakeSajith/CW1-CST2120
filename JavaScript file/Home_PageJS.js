import { message_displayer } from '../JavaScript file/Modules/Message_Displayer.js';

// signup check to appear new inputs
let signup_session = false;

//user data initialization //
const userdata = JSON.parse(localStorage.getItem("userdata")) || {};
class User {
    constructor(username, password, phone, age, global_score_point) {
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.age = age;
        this.global_score_point = global_score_point;
    }
}
    
    // sign up handler
    document.getElementById('SignupButton').addEventListener('click',function() {
        const phone_input = document.getElementById("phone");
        const age_input = document.getElementById("age");
        const phone_label = document.getElementById("phonelabel")
        const age_label = document.getElementById("agelabel")
        if (!signup_session) {
            phone_input.style.display = "block";
            age_input.style.display = "block";
            phone_label.style.display = "block";
            age_label.style.display = "block";
            message_displayer("Please fill in the inputs to sign up.", "Balsamiq Sans", "20px", "yellow", 3000);
            signup_session = true;
            return;
        }

        // vars
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const Email_Characters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const password = document.getElementById("password").value.trim();
        const age = document.getElementById("age").value.trim();
        const IntAge = Number(age);
        const phone = document.getElementById("phone").value.trim();
        const max_numbers = /^[0-9]{10,15}$/;

        //validation
        if (username.length < 3) {
            message_displayer("Username should be atleast 3+ Characters!", "Balsamiq Sans", "20px", "red", 3000);
            return;
        } else if (!Email_Characters.test(email)) {
            message_displayer("Enter a valid email!", "Balsamiq Sans", "20px", "red", 3000);
            return;
        } else if (password.length < 6) {
            message_displayer("Password must be 6+ Characters!", "Balsamiq Sans", "20px", "red", 3000);
            return;
        } else if (!IntAge) {
            message_displayer("Age must be a number!", "Balsamiq Sans", "20px", "red", 3000);
            return;
        } else if (IntAge < 5 || IntAge > 100) {
            message_displayer("Age must be between 5 and 100!", "Balsamiq Sans", "20px", "red", 3000);
            return;
        } else if (!max_numbers.test(phone)) {
            message_displayer("Enter a valid phone number.", "Balsamiq Sans", "20px", "red", 3000);
            return;
        } else if (userdata[email]) {
            message_displayer("Theres an account already with this email.","Balsamiq Sans","20px","red",3000);
            return;
        } else {
            for (let key in userdata) {
                if (userdata[key].username == username) {
                    message_displayer("Username already exists","Balsamiq Sans","20px","red",3000);
                    return;
                    } else if (userdata[key].phone == phone) {
                        message_displayer("Theres already an account with this phone!","Balsamiq Sans","20px","red",3000);
                        return;
                        }}
                }
            let New_Account = new User(username, password, phone, age, 0);
            userdata[email] = New_Account;
            localStorage.setItem("userdata", JSON.stringify(userdata));
            message_displayer("Successfully Registered!","Balsamiq Sans","20px","green",3000);
            signup_session = false;
            phone_input.style.display = "none";
            age_input.style.display = "none";
            phone_label.style.display = "none";
            age_label.style.display = "none";
            });

    // login handler
    document.getElementById("LoginButton").addEventListener("click", function() {    
        const email_input = document.getElementById("email").value.trim();
        const password_input = document.getElementById("password").value.trim();
        const user_input = document.getElementById("username").value.trim();
        if (userdata[email_input]) {
            if (userdata[email_input].password === password_input &&
                userdata[email_input].username === user_input) {
                message_displayer("Logged in successfully! Redirecting..", "Balsamiq Sans", "20px", "green", 3000);
                localStorage.setItem("Player",JSON.stringify({
                    user_email: email_input,
                    username: userdata[email_input].username,
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

    // Play as guest listener

    document.getElementById("PASButton").addEventListener("click", function() {
        message_displayer("Redirecting you..","Balsamiq Sans","20px","yellow",3000);    
        setTimeout(() => {
            window.location.href= "../html_files/Game_Page.html";
        },3500);    
        
    });

