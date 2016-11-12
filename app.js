"use strict";

var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var skipper = require ("skipper");
var colors = require ("colors");
var passport = require("passport");
var session = require("express-session");
var config = require("./config");
var Users = require('./server/users/model');
var bcrypt = require("bcryptjs");
var LocalStrategy = require('passport-local').Strategy;
var flash = require("connect-flash");

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
app.use(session({secret: "iwastesomuchtimeitsnotevenfunny"}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.get('/login', function(req, res) {
//
//         // render the page and pass in any flash data if it exists
//         res.sendFile(__dirname + "/client/login.html");
// });
//
// app.get('/logout', function(req, res) {
//         req.logout();
//         res.redirect('/');
// });
//
//
// function isLoggedIn(req, res, next) {
//
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();
//
//     // if they aren't redirect them to the home page
//     res.redirect('/logout');
// }
//
// passport.serializeUser(function(user, done) {
//     done(null, user);
// })
//
// passport.deserializeUser(function(id, done) {
//     Users.findById(id, function(err, user){
//             console.log('deserializing user:', user);
//             done(err, user);
//         });
// })
//
// passport.use('local-login', new LocalStrategy(
//   function(username, password, done) {
//       console.log("ji")
//     Users.findOne({ username: username}, function (err, user) {
//       done(err, user);
//     });
//   }
// ));



// passport.use('local-login', new LocalStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'username',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) { // callback with email and password from our form
//         // find a user whose email is the same as the forms email
//         // we are checking to see if the user trying to login already exists
//         console.log("hello")
//         Users.findOne({ 'email' :  email }, function(err, user) {
//             console.log("hello");
//
//             // if there are any errors, return the error before anything else
//             if (err){
//                 console.log(err)
//                     return done(err);
//
//             }
//
//             // if no user is found, return the message
//             if (!user){
//                 console.log(user)
//                 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//
//             }
//
//             // if the user is found but the password is wrong
//             console.log(user)
//             console.log(bcrypt.hashSync(password, user.salt))
//             if (user.encryptedPass !== bcrypt.hashSync(password, user.salt))
//                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
//
//             // all is well, return successful user
//             return done(null, user);
//         });
//
// }));

// app.post('/login', passport.authenticate('local-login', {
//         successRedirect : '/home', // redirect to the secure profile section
//         failureRedirect : '/login', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
// }));
// app.post('/login', function (req, res) {
//     res.sendFile(__dirname + "/client/login.html");
// });

// app.get("/signup", function(req, res) {
//     res.sendFile(__dirname + "/client/signup")
// })

// app.post('/login',
//   passport.authenticate('local-login', { failureRedirect: '/logout' }),
//   function(req, res) {
//     res.redirect('/home');
//   });


app.get("/",  function (req, res){
    res.sendFile(__dirname+"/client/index.html");
});

// app.get("/home/", isLoggedIn, function(req, res){
//     res.status(200).json({})
// })

// ================ user routes ================
var userrouter = require("./server/users/routes")

app.get("/users", userrouter.index);
app.get("/users/:user", userrouter.retrieve);
app.post("/users", userrouter.create)
app.put("/users/:user", userrouter.update)
app.delete("/users", userrouter.deleteAll)
app.delete("/users/:user", userrouter.deleteOne)


// app.get("/users", )




// app.post('/login', passport.authenticate('local', {
//     successRedirect:'/profile',
//     failureRedirect:'/'
// }))

app.listen(8000, function() {
    console.log("our app is using port 8000".green);
});
