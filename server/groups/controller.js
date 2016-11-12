var Group = require('./model');
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
    Group.remove({}, function(err){
        if (err) {
            console.log(err)
        } else {
            res.status(204).end('success');
        }
    });
}

function deleteGroup (req, res) {
    findUser(req, res, function(group){
        group.remove(function(err) {
            if (err) return reportError(err, res)
            res.status(204).end()
        })
    })

}

function indexGroups (req, res) {
    Group.find(function (err, collection){
        if (err) return reportError(err, res)
        res.json(collection)
    })
}

function retrieveGroup (req, res) {
    findUser(req, res, function (group){
        res.status(200).json(group)
    })
}

function createGroup (req, res) {
  console.log('Controller is working');
  Group.create({

    groupName: req.body.groupName,
    groupCaptain: req.body.groupCaptain,
    groupPlayers: req.body.groupPlayers,
    eventId: req.body.eventId
  },
  function (err, group) {
      if (err) return reportError(err, res)
      res.status(201).json(group);
    return "create"
  })
}

function updateGroup (req, res) {
    findGroup(req, res, function (group) {
        for (var key in req.body) {
            switch (key) {
                case "deleteEvent":
                    var ind = group.events.indexOf(req.body[key])
                    if (ind !== -1){
                        // group.events =
                        // console.log(group.events.splice(ind, 1))
                        group.events.splice(ind, 1)
                        console.log(group.events)
                    } else {
                        err = {
                            name:"ValidationError",
                            message: config.INVALID_ID + req.body[key]
                        }
                        reportError(err, res)
                    }
                    break
                case "addEvent":
                    if (group.events.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    group.events.push(req.body[key])
                    break
                case "deleteUser":
                    break
                case "addUser":
                    if (groups.group.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    groups.group.push(req.body[key])
                    break
                case "deleteCaptain":
                    var ind = group.events.indexOf(req.body[key])
                    if (ind !== -1){
                        // group.events =
                        // console.log(group.events.splice(ind, 1))
                        group.events.splice(ind, 1)
                        console.log(group.events)
                    } else {
                        err = {
                            name:"ValidationError",
                            message: config.INVALID_ID + req.body[key]
                        }
                        reportError(err, res)
                    }
                    break
                case "addCaptain":
                    if (group.captain.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.DUPLICATE_KEY + req.body[key]}, res)
                    }
                    group.captain.push(req.body[key])
                    break
                default:
                // console.log(config.userKeys.indexOf('bob') !== -1)
                    if (config.userKeys.indexOf(key) !== -1) {
                        console.log("group " + group[key])
                        console.log("body" + req.body[key])
                        group[key] = req.body[key]
                    } else {
                        reportError({name:"ValidationError",message:config.INVALID_BODY + key}, res)
                    }
            }
        }
        group.save((function (err)
		{
			if (err) return reportError(err, res)

            res.status(204).end()

		}))
    })
}

function findGroup(req, res, success) {
    var id = req.params.group
    Group.findById(id, function (err, item) {
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
