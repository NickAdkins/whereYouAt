var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  console.log('Were Creating a new Group!');
  groupId: {type: number, unique: true},
  groupName: {type: string, required: true},
  groupCaptain: {type:number},
  groupPlayers: [ids],
  eventId: {type: number}
});

module.exports = mongoose.model('Group', groupSchema);
