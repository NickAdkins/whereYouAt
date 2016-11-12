var express = require('express');
var router = express.Router()
var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  eventName: {type: String, required: true}
  eventLocation:[
    lat: {type: String, required: true},
    long: {type: String, required: true}
  ],
  eventTime: {type: Date, required: true},
  eventDescription: {type: String},
  group: {type: [String], default: []}
});

module.exports = mongoose.model('Event', eventSchema);
