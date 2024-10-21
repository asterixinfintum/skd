"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fileSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});
var FileModel = mongoose.model('FileModel', fileSchema);
module.exports = FileModel;