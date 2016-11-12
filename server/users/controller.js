var User = require("./model");
var config = require("../../config");
var bcrypt = require("bcryptjs");
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
    findUser(req, res, function(user){
        user.remove(function(err) {
            if (err) return reportError(err, res)
            res.status(204).end()
        })
    })
}

function indexUsers (req, res) {
    User.find(function (err, collection) {
        if (err) return reportError(err, res)
        res.json(collection)
    })
}

function retrieveUser (req, res) {
    findUser(req, res, function (user){
        res.status(200).json(user)
    })
}

function createUser (req, res) {
    // res.status(201).end('create');
    var salt = bcrypt.genSaltSync(10);
    User.create({
        email:          req.body.email,
        encryptedPass:  bcrypt.hashSync(req.body.encryptedPass, salt),
        fName:          req.body.fName,
        lName:          req.body.lName,
        phone:          req.body.phone,
        salt:           salt

    }, function (err, user) {
        if (err){return reportError(err, res)}
        res.status(201).json(user);
    })
}

function updateUser (req, res) {
    findUser(req, res, function (user) {
        for (var key in req.body) {
            switch (key) {
                case "deleteEvent":
                    deleteFromList(user.events, req.body[key], res)

                    break
                case "addEvent":
                    if (user.events.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    user.events.push(req.body[key])
                    break
                case "deleteGroup":
                    deleteFromList(user.groups, req.body[key], res)

                    break
                case "addGroup":
                    if (user.groups.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    user.groups.push(req.body[key])

                    break
                case "deleteAdmin":
                    deleteFromList(user.admin, req.body[key], res)

                    break
                case "addAdmin":
                    if (user.admin.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    user.admin.push(req.body[key])

                    break
                case "deleteCaptain":
                    deleteFromList(user.captain, req.body[key], res)
                    break
                case "addCaptain":
                    if (user.captain.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.DUPLICATE_KEY + req.body[key]}, res)
                    }
                    user.captain.push(req.body[key])
                    break
                default:
                // console.log(config.userKeys.indexOf('bob') !== -1)
                    if (config.userKeys.indexOf(key) !== -1) {
                        console.log("user " + user[key])
                        console.log("body" + req.body[key])
                        user[key] = req.body[key]
                    } else {
                        reportError({name:"ValidationError",message:config.INVALID_BODY + key}, res)
                    }
            }
        }
        user.save((function (err)
		{
			if (err) return reportError(err, res)

            res.status(204).end()

		}))
    })
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

function deleteFromList (list, item, res) {
    var ind = list.indexOf(item)
    if (ind !== -1){
        // user.events =
        // console.log(user.events.splice(ind, 1))
        list.splice(ind, 1)
        // console.log(list)
    } else {
        err = {
            name:"ValidationError",
            message: config.INVALID_ID + item
        }
        reportError(err, res)
    }
}
