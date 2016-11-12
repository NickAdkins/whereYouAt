var openSignUp = document.getElementById('sign-upBG');
var openLogin = document.getElementById('loginBG');
//
var sign = document.getElementById("open-sign-up");
var login = document.getElementById("open-log-in");
var loginClose = document.getElementById("login-close");
var signClose = document.getElementById("sign-up-close");

//
//
sign.onclick = function() {
    openSignUp.style.display = "block";
}

login.onclick = function() {
    openLogin.style.display = "block";
}
//
signClose.onclick = function() {
        openSignUp.style.display = "none";
}
//
loginClose.onclick = function() {
    openLogin.style.display = "none";
}
//
window.onclick = function(event) {
    if (event.target == openSignUp) {
        openSignUp.style.display = "none";
    }
    if (event.target == openLogin) {
        openLogin.style.display = "none";
    }
}

var submitLogin = document.getElementById("send-login")

submitLogin.onclick = function (){
    if ()
}
