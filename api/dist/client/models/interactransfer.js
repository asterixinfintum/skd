"use strict";

var mongoose = require('mongoose');
var interacTransferSchema = new mongoose.Schema({
  securityQuestion: {
    type: String,
    required: true
  },
  securityAnswer: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function validator(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Invalid email address'
    }
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  destinationbank: {
    type: String,
    "default": ""
  },
  user: {
    type: String
  },
  isCryptoBuy: {
    type: Boolean,
    "default": false
  },
  cryptoAddress: {
    type: String,
    "default": ""
  },
  type: {
    type: String,
    "default": "transfer"
  },
  status: {
    type: String,
    "default": 'processing'
  },
  date: {
    type: String,
    "default": "".concat(Date.now())
  }
});
var InteracTransfer = mongoose.model('InteracTransfer', interacTransferSchema);
module.exports = InteracTransfer;