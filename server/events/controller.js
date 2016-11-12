var Event = ('./model');
var config = ('../../config');

module.exports = {
    deleteOne: deleteUser,
    deleteAll: deleteAllUsers,
    index: indexUsers,
    retrieve: retrieveUser,
    create: createEvent,
    update: updateUser
}

function deleteAllUsers (req, res) {
    return "deleteAll"
}

function deleteUser (req, res) {
    return "deleteone"
}

function indexUsers (req, res) {
    return "index"
}

function retrieveUser (req, res) {
    return "retrieve"
}

function createEvent (req, res) {
  console.log('Controller Event is connected');
  Event.create({
    eventId: //find the id for eventId
    eventName: req.body.eventName,
    eventLocation: // google api lat & long
    eventTime: req.body.eventTime,
    eventDescription: req.body.eventDescription
  }
  function (err, user) {
      if (err) return reportError(err, res)
      res.status(201).json(user);
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

function updateUser (req, res) {
    return "update"
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
