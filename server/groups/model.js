var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  // console.log('Were Creating a new Group!');
  groupName: {type: String, required: true},
  groupCaptain: {type:String, required: true},
  groupPlayers: {type: [String], default: []},
  eventId: {type: String, required: true},
  roundUpTime: {type: Date , required: true},
});

module.exports = mongoose.model('Group', groupSchema)
