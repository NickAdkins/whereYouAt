var Group = ('./model');
var config = require("../../config");

module.exports = {
    deleteOne: deleteGroup,
    deleteAll: deleteAllGroups,
    index: indexGroups,
    retrieve: retrieveGroup,
    create: createGroup,
    update: updateGroup,

}

function deleteAllGroups (req, res) {
    User.remove({}, function(err){
        if (err) {
            console.log(err)
        } else {
            res.status(204).end('success');
        }
    });
}

function deleteGroup (req, res) {
    findUser(req, res, function(user){
        user.remove(function(err) {
            if (err) return reportError(err, res)
            res.status(204).end()
        })
    })

}

function indexGroups (req, res) {
    User.find(function (err, collection){
        if (err) return reportError(err, res)
        res.json(collection)
    })
}

function retrieveGroup (req, res) {
    findUser(req, res, function (user){
        res.status(200).json(user)
    })
}

function createGroup (req, res) {
  console.log('Controller is working');
  Group.create({
    groupId: //how to generate mongoose id
    groupName: req.body.groupName,
    groupCaptain: // group captain id
    groupPlayers: //list of player [ids],
    eventId: // id of event/s
  },
  function (err, user) {
      if (err) return reportError(err, res)
      res.status(201).json(user);
    return "create"
  })
}

function updateGroup (req, res) {
    findGroup(req, res, function (group) {
        for (var key in req.body) {
            switch (key) {
                case "deleteEvent":
                    var ind = user.events.indexOf(req.body[key])
                    if (ind !== -1){
                        // user.events =
                        // console.log(user.events.splice(ind, 1))
                        user.events.splice(ind, 1)
                        console.log(user.events)
                    } else {
                        err = {
                            name:"ValidationError",
                            message: config.INVALID_ID + req.body[key]
                        }
                        reportError(err, res)
                    }
                    break
                case "addEvent":
                    if (user.events.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    user.events.push(req.body[key])
                    break
                case "deleteGroup":
                    break
                case "addGroup":
                    if (user.groups.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    user.groups.push(req.body[key])

                    break
                case "deleteAdmin":

                    break
                case "addAdmin":
                    if (user.admin.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    user.admin.push(req.body[key])

                    break
                case "deleteCaptain":
                    var ind = user.events.indexOf(req.body[key])
                    if (ind !== -1){
                        // user.events =
                        // console.log(user.events.splice(ind, 1))
                        user.events.splice(ind, 1)
                        console.log(user.events)
                    } else {
                        err = {
                            name:"ValidationError",
                            message: config.INVALID_ID + req.body[key]
                        }
                        reportError(err, res)
                    }
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

function findGroup(req, res, success) {
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
