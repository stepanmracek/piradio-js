'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StationSchema = new Schema({
  name: {
    type: String,
    required: 'Station name'
  },
  url: {
    type: String,
    required: 'Station url'
  }
});

module.exports = mongoose.model('Station', StationSchema);