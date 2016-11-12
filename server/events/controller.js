var Event = require('./model');
var config = require('../../config');
// console.log(new Event)

module.exports = {
    deleteOne: deleteEvent,
    deleteAll: deleteAllEvents,
    index: indexEvents,
    retrieve: retrieveEvent,
    create: createEvent,
    update: updateEvent
}

function deleteAllEvents (req, res) {
    Event.remove({}, function(err){
        if (err) {
            console.log(err)
        } else {
            res.status(204).end('success');
        }
    });
}

function deleteEvent (req, res) {
    findUser(req, res, function(event){
        event.remove(function(err) {
            if (err) return reportError(err, res)
            res.status(204).end()
        })
    })
}

function indexEvents (req, res) {
    Event.find(function (err, collection) {
        if (err) return reportError(err, res)
        res.json(collection)
    })
}

function retrieveEvent (req, res) {
    findUser(req, res, function (event){
        res.status(200).json(event)
    })
}

function createEvent (req, res) {
  console.log('Controller Event is connected');
  Event.create({
    eventName: req.body.eventName,
    eventLocation: req.body.eventLocation,
    eventTime: req.body.eventTime,
    eventDescription: req.body.eventDescription
}),
  function (err, event) {
      if (err) return reportError(err, res)
      res.status(201).json(event).end();
  }
}

function findEvent(req, res, success) {
    var id = req.params.event
    Event.findById(id, function (err, item) {
        if (err) return reportError(err, res)
        if (!item) {
            send404(res, config.INVALID_ID + "profile.")
        } else {
            success(item);
        }
    })
}

function updateEvent (req, res) {
    findEvent(req, res, function (event) {
        for (var key in req.body) {
            switch (key) {
                case "deleteEvent":
                    deleteFromList(event.events, req.body[key], res)

                    break
                case "addEvent":
                    if (event.events.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    event.events.push(req.body[key])
                    break
                case "deleteGroup":
                    deleteFromList(event.groups, req.body[key], res)

                    break
                case "addGroup":
                    if (event.groups.indexOf(req.body[key])){
                        reportError({name:"ValidationError", message:config.INVALID_KEY + req.body[key]}, res)
                    }
                    event.groups.push(req.body[key])

                    break
                default:
                // console.log(config.userKeys.indexOf('bob') !== -1)
                    if (config.userKeys.indexOf(key) !== -1) {
                        console.log("event " + event[key])
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
