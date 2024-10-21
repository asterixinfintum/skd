"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var quickcontactSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true
  },
  accountnumber: {
    type: String,
    required: true
  }
});
var QuickContact = mongoose.model('QuickContact', quickcontactSchema);
module.exports = QuickContact;