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

var createTracker = new() XMLHttpRequest();
createTracker.onreadystatechange= function () {
    if (createTracker.readyState == XMLHttpRequest.DONE){
        if (createTracker.status < 400 && createTracker.status >=200) {

        }
        else {
            alert("is broken")
        }
    }
    var query = "username="+document.getElementById(uname)+"&fname=" +document.getElementById(fname) + "&lname=" +document.getElementById(lname) + "&phone=" document.getElementById(phone)
    createTracker.open("POST", url);
    createTracker.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    createTracker.send(query);
}
//
// var init = function () {
//     var content = document.getElementById("content");
//     content.innerHTML = "";
//     var home = document.getElementById("homeTemplate");
//     var homeView = home.content.cloneNode(true);
//
// }
//
// init()
