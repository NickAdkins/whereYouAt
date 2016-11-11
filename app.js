"use strict";

var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var skipper = require ("skipper");
var colors = require ("colors");
var passport = require("passport");
var session = require("express-session");
var config = require("./config");

mongoose.connect("mongodb://localhost/test");

mongoose.connection.on("connected", function () {
    console.log("The magic is happening!".blue)
})

mongoose.connection.on("error", function (err) {
    console.log("Sadly, the magic is gone... \n".red)
})


var app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname+"/client"));
app.use(skipper());

// app.use(session({
//   // store: new RedisStore({
//     // url: config.redisStore.url
//   // }),
//   secret: config.secret,
//   resave: false,
//   saveUninitialized: false
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(app.router);

// app.use(require("./server/routes"));
app.use("/users", require("./server/users/routes"));
app.use("/events", require("./server/events/routes"));
app.use("/groups", require("./server/groups/routes"));

app.get("/",  function (req, res){
    res.sendFile(__dirname+"/client/index.html");

});

// app.post('/login', passport.authenticate('local', {
//     successRedirect:'/profile',
//     failureRedirect:'/'
// }))

app.listen(8000, function() {
    console.log("our app is using port 8000".green);
});
