var User = require("./model");
var config = require("../../config");
module.exports = {
    deleteOne: deleteUser,
    deleteAll: deleteAllUsers,
    index: indexUsers,
    retrieve: retrieveUser,
    create: createUser,
    update: updateUser
}

function deleteAllUsers (req, res) {
    User.remove({}, function(err){
        if (err) {
            console.log(err)
        } else {
            res.status(204).end('success');
        }
    });
}

function deleteUser (req, res) {
    res.status(204).end('index');

}

function indexUsers (req, res) {
    res.status(200).end('index');
}

function retrieveUser (req, res) {
    res.status(200).end('retrieve');
}

function createUser (req, res) {
    // res.status(201).end('create');
    User.create({
        email:          req.body.email,
        encryptedPass:  req.body.pwd,
        fName:          req.body.fName,
        lName:          req.body.lName,
        phone:          req.body.phone

    }, function (err, user) {
        if (err) return reportError(err, res)
        res.status(201).json(user);
    })
}

function updateUser (req, res) {
    res.status(204).end('update');
}

function findUser(req, res, success) {
    var id = req.params.user
    User.findById(id, function (err, item) {
        if (err) return reportError(err, res)
        if (!item) {
            send404(res, config.INVALID_ID + "profile.")
        } else {
            success(item);
        }
    })
}

function send404(res) {
    res.status(404).json({
        error: message
    })
}

function reportError(err, res) {
    if (err.name == "ValidationError") {
        res.status(422).json({
            error: err.message
        })
    }
}
