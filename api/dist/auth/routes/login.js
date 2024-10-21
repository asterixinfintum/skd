"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("../../models/user"));
var _authenticateToken = _interopRequireDefault(require("../../utils/authenticateToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var login = (0, _express["default"])();
login.post('/login', function (req, res) {
  var _req$body = req.body,
    email = _req$body.email,
    password = _req$body.password;
  _user["default"].login({
    email: email,
    password: password
  }).then(function (success) {
    res.status(200).send({
      success: success
    });
  })["catch"](function (error) {
    console.log(error);
    res.status(405).send({
      error: error
    });
  });
});
var _default = exports["default"] = login;