"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _user = _interopRequireDefault(require("../../models/user"));
var _account = _interopRequireDefault(require("../../models/account"));
var _card = _interopRequireDefault(require("../../models/card"));
var _transaction = _interopRequireDefault(require("../../models/transaction"));
var _usercontact = _interopRequireDefault(require("../../models/usercontact"));
var _userloan = _interopRequireDefault(require("../models/userloan"));
var _notification = _interopRequireDefault(require("../../models/notification"));
var _message = _interopRequireDefault(require("../../models/message"));
var _userinvestment = _interopRequireDefault(require("../models/userinvestment"));
var _usersaving = _interopRequireDefault(require("../models/usersaving"));
var _files = _interopRequireDefault(require("../../models/files"));
var _interactransfer = _interopRequireDefault(require("../models/interactransfer"));
var _authenticateToken = _interopRequireDefault(require("../../utils/authenticateToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var client = (0, _express["default"])();
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/'); // Destination folder
  },

  filename: function filename(req, file, cb) {
    // Preserve the original file name and extension
    cb(null, file.originalname);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});
client.get('/currentclient', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var id, user, account, cards;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context.next = 14;
            break;
          }
          id = req.query.id;
          _context.next = 4;
          return _user["default"].findOne({
            _id: id
          });
        case 4:
          user = _context.sent;
          if (user) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(405).send({
            error: 'not alowed'
          }));
        case 7:
          _context.next = 9;
          return _account["default"].findOne({
            _id: user.account
          });
        case 9:
          account = _context.sent;
          _context.next = 12;
          return _card["default"].find({
            user: user._id
          });
        case 12:
          cards = _context.sent;
          return _context.abrupt("return", res.status(200).send({
            success: {
              message: 'success',
              type: 'auth',
              content: {
                user: user,
                account: account,
                cards: cards
              }
            }
          }));
        case 14:
          res.status(405).send({
            error: 'not alowed'
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
client.post('/transaction/transfer', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, nameofbnk, country, accountno, amounttosend, newtransfer;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context2.next = 7;
            break;
          }
          _req$body = req.body, nameofbnk = _req$body.nameofbnk, country = _req$body.country, accountno = _req$body.accountno, amounttosend = _req$body.amounttosend;
          newtransfer = new _transaction["default"]({
            user: req.user._id,
            type: 'transfer',
            destinationbank: nameofbnk,
            destinationcountry: country,
            destinationaccount: accountno,
            amount: amounttosend
          });
          _context2.next = 5;
          return newtransfer.save();
        case 5:
          _user["default"].addTransferToUser(req.user._id, newtransfer._id).then(function (success) {
            return res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context2.abrupt("return");
        case 7:
          res.status(405).send({
            error: 'not alowed'
          });
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
client.get('/transaction/get', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context3.next = 3;
            break;
          }
          _user["default"].getTransactions(req.user._id).then(function (success) {
            return res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context3.abrupt("return");
        case 3:
          res.status(405).send({
            error: 'not alowed'
          });
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
client.post('/client/viewnotifications', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context4.next = 3;
            break;
          }
          _notification["default"].markread(req.user._id).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context4.abrupt("return");
        case 3:
          res.status(405).send({
            error: 'not alowed'
          });
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
client.get('/client/messages', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userid, messages;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!(!req.user || !req.user._id)) {
            _context5.next = 2;
            break;
          }
          return _context5.abrupt("return", res.status(401).send({
            error: 'Unauthorized'
          }));
        case 2:
          _context5.prev = 2;
          userid = req.query.userid;
          if (userid) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(400).send({
            error: 'User ID is required'
          }));
        case 6:
          _context5.next = 8;
          return _message["default"].find({
            user: userid
          });
        case 8:
          messages = _context5.sent;
          console.log(messages); // Assuming this is for debugging; remove in production
          return _context5.abrupt("return", res.status(200).send({
            success: true,
            messages: messages
          }));
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](2);
          console.error('Error fetching messages:', _context5.t0);
          res.status(500).send({
            error: 'Internal Server Error'
          });
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 13]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
client.get('/client/notifications', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var userid, notifications;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context6.next = 13;
            break;
          }
          _context6.prev = 1;
          userid = req.query.userid;
          _context6.next = 5;
          return _notification["default"].find({
            user: userid
          });
        case 5:
          notifications = _context6.sent;
          res.status(200).send({
            success: {
              message: 'success',
              type: 'get notifications',
              content: notifications
            }
          });
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](1);
          throw new Error(_context6.t0);
        case 12:
          return _context6.abrupt("return");
        case 13:
          res.status(405).send({
            error: 'not alowed'
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 9]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
client.post('/client/supportcontact', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context7.next = 3;
            break;
          }
          _user["default"].createmsg(req.user._id, req.body).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context7.abrupt("return");
        case 3:
          res.status(405).send({
            error: 'not alowed'
          });
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
client.post('/client/joininvestment', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var newuserinvestment, user, investmentid, amount;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context8.next = 7;
            break;
          }
          newuserinvestment = new _userinvestment["default"](_objectSpread(_objectSpread({}, req.body), {}, {
            user: req.user._id
          }));
          _context8.next = 4;
          return newuserinvestment.save();
        case 4:
          user = newuserinvestment.user, investmentid = newuserinvestment.investmentid, amount = newuserinvestment.amount;
          _account["default"].addinvestmentplan(user, investmentid, amount).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context8.abrupt("return");
        case 7:
          res.status(405).send({
            error: 'not alowed'
          });
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
client.post('/client/addcontact', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context9.next = 3;
            break;
          }
          _usercontact["default"].createcontact(_objectSpread({
            userid: req.user._id
          }, req.body)).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context9.abrupt("return");
        case 3:
          res.status(405).send({
            error: 'not alowed'
          });
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
client.get('/client/getcontacts', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context10.next = 3;
            break;
          }
          _usercontact["default"].getusercontacts({
            userid: req.user._id
          }).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context10.abrupt("return");
        case 3:
          res.status(405).send({
            error: 'not alowed'
          });
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
client.post('/client/loanrequest', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context11.next = 3;
            break;
          }
          _userloan["default"].createuserloan(req.body).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context11.abrupt("return");
        case 3:
          res.status(405).send({
            error: 'not alowed'
          });
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
client.get('/client/getuserloans', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context12.next = 4;
            break;
          }
          user = req.query.user;
          _userloan["default"].getuserloans(user).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context12.abrupt("return");
        case 4:
          res.status(405).send({
            error: 'not alowed'
          });
        case 5:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
client.get('/client/getinvestments', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context13.next = 4;
            break;
          }
          user = req.query.user;
          _userinvestment["default"].getuserinvestments(user).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
          });
          return _context13.abrupt("return");
        case 4:
          res.status(405).send({
            error: 'not alowed'
          });
        case 5:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
client.post('/client/joinsavingsplan', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context14.next = 3;
            break;
          }
          _usersaving["default"].createsavingsplan(req.body).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
            throw new Error(error);
          });
          return _context14.abrupt("return");
        case 3:
          res.status(405).send({
            error: 'not alowed'
          });
        case 4:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
client.get('/client/savingsplan', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context15.next = 4;
            break;
          }
          user = req.query.user;
          _usersaving["default"].getusersavingsplans(user).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
            throw new Error(error);
          });
          return _context15.abrupt("return");
        case 4:
          res.status(405).send({
            error: 'not alowed'
          });
        case 5:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
client.post('/client/deposittosavingsitem', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context16.next = 3;
            break;
          }
          _usersaving["default"].deposittosavingsitem(req.body).then(function (success) {
            res.status(200).send({
              success: success
            });
          })["catch"](function (error) {
            res.status(405).send({
              error: error
            });
            throw new Error(error);
          });
          return _context16.abrupt("return");
        case 3:
          res.status(405).send({
            error: 'not alowed'
          });
        case 4:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
client.post('/client/upload/verification', _authenticateToken["default"], upload.single('file'), /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var newfileitem;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          if (!(req.user && req.user._id)) {
            _context17.next = 7;
            break;
          }
          if (!req.file) {
            _context17.next = 6;
            break;
          }
          newfileitem = new _files["default"]({
            user: req.user._id,
            path: req.file.path
          });
          _context17.next = 5;
          return newfileitem.save();
        case 5:
          res.status(200).send({
            success: 'success'
          });
        case 6:
          return _context17.abrupt("return");
        case 7:
          res.status(405).send({
            error: 'not alowed'
          });
        case 8:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
client.get('/client/upload/verification', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var userid, files;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          if (!(req.user && req.user._id)) {
            _context18.next = 7;
            break;
          }
          userid = req.query.userid;
          _context18.next = 5;
          return _files["default"].find({
            user: userid
          });
        case 5:
          files = _context18.sent;
          res.status(200).send({
            success: 'success',
            files: files
          });
        case 7:
          _context18.next = 13;
          break;
        case 9:
          _context18.prev = 9;
          _context18.t0 = _context18["catch"](0);
          console.log(_context18.t0);
          res.status(405).send({
            error: _context18.t0
          });
        case 13:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 9]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
client.put('/client/delete/verification', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var fileid, result;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          fileid = req.query.fileid;
          _context19.next = 4;
          return _files["default"].findByIdAndDelete(fileid);
        case 4:
          _context19.next = 6;
          return _files["default"].findByIdAndDelete(fileid);
        case 6:
          result = _context19.sent;
          console.log(result);
          res.status(200).send({
            message: 'file deleted',
            fileid: fileid
          });
          _context19.next = 14;
          break;
        case 11:
          _context19.prev = 11;
          _context19.t0 = _context19["catch"](0);
          res.status(405).send({
            error: _context19.t0
          });
        case 14:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 11]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
client.post('/client/transfer/interac', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var _req$body2, securityQuestion, securityAnswer, email, amount, cryptoAddress, isCryptoBuy, user, transfer;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _req$body2 = req.body, securityQuestion = _req$body2.securityQuestion, securityAnswer = _req$body2.securityAnswer, email = _req$body2.email, amount = _req$body2.amount, cryptoAddress = _req$body2.cryptoAddress, isCryptoBuy = _req$body2.isCryptoBuy;
          user = req.user;
          transfer = new _interactransfer["default"]({
            securityQuestion: securityQuestion,
            securityAnswer: securityAnswer,
            email: email,
            amount: amount,
            user: user,
            cryptoAddress: cryptoAddress,
            isCryptoBuy: isCryptoBuy
          });
          console.log(transfer);
          _context20.next = 7;
          return transfer.save();
        case 7:
          res.status(200).send({
            message: 'done'
          });
          _context20.next = 13;
          break;
        case 10:
          _context20.prev = 10;
          _context20.t0 = _context20["catch"](0);
          res.status(405).send({
            error: _context20.t0
          });
        case 13:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 10]]);
  }));
  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());
client.get('/client/transfer/interac', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var user, interacs;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          user = req.query.user;
          _context21.next = 4;
          return _interactransfer["default"].find({
            user: user
          });
        case 4:
          interacs = _context21.sent;
          res.status(200).send({
            interacs: interacs
          });
          _context21.next = 11;
          break;
        case 8:
          _context21.prev = 8;
          _context21.t0 = _context21["catch"](0);
          res.status(405).send({
            error: _context21.t0
          });
        case 11:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 8]]);
  }));
  return function (_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}());
client.get('/interac/get', _authenticateToken["default"], /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var interacs;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          if (!(req.user && req.user._id)) {
            _context22.next = 7;
            break;
          }
          _context22.next = 4;
          return _interactransfer["default"].find({
            user: req.user._id
          });
        case 4:
          interacs = _context22.sent;
          res.status(200).send({
            interacs: interacs
          });
          return _context22.abrupt("return");
        case 7:
          res.status(405).send({
            error: 'not alowed'
          });
          _context22.next = 13;
          break;
        case 10:
          _context22.prev = 10;
          _context22.t0 = _context22["catch"](0);
          res.status(405).send({
            error: _context22.t0
          });
        case 13:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 10]]);
  }));
  return function (_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}());
var _default = exports["default"] = client;