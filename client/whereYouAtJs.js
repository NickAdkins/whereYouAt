var getUsers = function(userList,userETAs){
    for (i=0;i<userList.length;i++){
        addData(userList[i]);
    }
};

var addNewCard = function(userData){
    var container = document.getElementById("groups-page");
    var pageTemplate = document.getElementById("homeTemplate");
    var newElement =  pageTemplate.content.cloneNode(true);
    var memberName = newElement.querySelector(".member-name");
    memberName.innerHTML = userData.fName + userData.lName;
    var ETA = newElement.querySelector(".eta");
    ETA.innerHTML = "";
    container.insertBefore( newElement, container.firstChild );
};

var addForm = function(){
    var container = document.getElementById("groups-page");
    var pageTemplate = document.getElementById("userTemplate");
    var newElement =  pageTemplate.content.cloneNode(true);
    container.appendChild( newElement );
    console.log("addForm ran");

};


var createTracker = new XMLHttpRequest();
createTracker.onreadystatechange= function () {
    if (createTracker.readyState == XMLHttpRequest.DONE){
        if (createTracker.status < 400 && createTracker.status >=200) {
            console.log("user added successfully!");
            addData(createTracker.responseText);
        }
        else {
            alert("is broken");
        }
    }
    var query = "username="+document.getElementById("new-user-name")+"&fname=" +document.getElementById("new-first-name") + "&lname=" +document.getElementById("new-last-name") + "&phone=" +document.getElementById("new-user-phone")
    createTracker.open("POST", url);
    createTracker.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    createTracker.send(query);
}

var init = function () {
    addForm();
    var getDB = new XMLHttpRequest();
    getDB.onreadystatechange= function () {
        if (getDB.readyState == XMLHttpRequest.DONE){
            if (getDB.status < 400 && getDB.status >=200) {
                getUsers(getDB.responseText);
            }
            else {
                alert("is broken");
            }
        }
        getDB.open("GET", url);
        getDB.send();
    }
    console.log("init ran");
};
init()
