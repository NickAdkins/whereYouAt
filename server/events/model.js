var express = require('express');
var router = express.Router()
var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  console.log('We are now creating an Event');
  eventId: {type: number, unique: true},
  eventName: {type: string, required: true}
  eventLocation:[
    lat: {type: string, required: true},
    long: {type: string, required: true}
  ],
  eventTime: {type: Date, required: true},
  eventDescription: {type: string}
});

module.exports = mongoose.model('Event', eventSchema);
