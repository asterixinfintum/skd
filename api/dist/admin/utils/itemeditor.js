"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _loan = _interopRequireDefault(require("../../models/loan"));
var _investmentplan = _interopRequireDefault(require("../../models/investmentplan"));
var _savingsplan = _interopRequireDefault(require("../../models/savingsplan"));
var _notification = _interopRequireDefault(require("../../models/notification"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ItemEditor = /*#__PURE__*/function () {
  function ItemEditor() {
    _classCallCheck(this, ItemEditor);
  }
  _createClass(ItemEditor, null, [{
    key: "createLoan",
    value: function createLoan(data) {
      return new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
          var newLoan;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                newLoan = new _loan["default"](data);
                _context.next = 4;
                return newLoan.save();
              case 4:
                resolve({
                  message: 'success',
                  type: 'admin item create',
                  content: newLoan
                });
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                reject({
                  message: 'error',
                  type: 'admin item create',
                  reason: _context.t0
                });
              case 10:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[0, 7]]);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "createInvestmentplan",
    value: function createInvestmentplan(data) {
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
          var newInvestmentplan;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                newInvestmentplan = new _investmentplan["default"](data);
                _context2.next = 4;
                return newInvestmentplan.save();
              case 4:
                resolve({
                  message: 'success',
                  type: 'admin item create',
                  content: newInvestmentplan
                });
                _context2.next = 10;
                break;
              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                reject({
                  message: 'error',
                  type: 'admin item create',
                  reason: _context2.t0
                });
              case 10:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[0, 7]]);
        }));
        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "createSavingsplan",
    value: function createSavingsplan(data) {
      return new Promise( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
          var newSavingsplan;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                newSavingsplan = new _savingsplan["default"](data);
                _context3.next = 4;
                return newSavingsplan.save();
              case 4:
                resolve({
                  message: 'success',
                  type: 'admin item create',
                  content: newSavingsplan
                });
                _context3.next = 10;
                break;
              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                reject({
                  message: 'error',
                  type: 'admin item create',
                  reason: _context3.t0
                });
              case 10:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[0, 7]]);
        }));
        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "createNotification",
    value: function createNotification(data) {
      return new Promise( /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
          var newNotification;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                newNotification = new _notification["default"](data);
                _context4.next = 4;
                return newNotification.save();
              case 4:
                resolve({
                  message: 'success',
                  type: 'admin item create',
                  content: newNotification
                });
                _context4.next = 10;
                break;
              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                reject({
                  message: 'error',
                  type: 'admin item create',
                  reason: _context4.t0
                });
              case 10:
              case "end":
                return _context4.stop();
            }
          }, _callee4, null, [[0, 7]]);
        }));
        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "getLoans",
    value: function () {
      var _getLoans = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var loans;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _loan["default"].find();
            case 2:
              loans = _context5.sent;
              return _context5.abrupt("return", loans);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function getLoans() {
        return _getLoans.apply(this, arguments);
      }
      return getLoans;
    }()
  }, {
    key: "getInvestmentplans",
    value: function () {
      var _getInvestmentplans = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var investmentplans;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _investmentplan["default"].find();
            case 2:
              investmentplans = _context6.sent;
              return _context6.abrupt("return", investmentplans);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function getInvestmentplans() {
        return _getInvestmentplans.apply(this, arguments);
      }
      return getInvestmentplans;
    }()
  }, {
    key: "getSavingsplans",
    value: function () {
      var _getSavingsplans = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var savingsplans;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _savingsplan["default"].find();
            case 2:
              savingsplans = _context7.sent;
              return _context7.abrupt("return", savingsplans);
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function getSavingsplans() {
        return _getSavingsplans.apply(this, arguments);
      }
      return getSavingsplans;
    }()
  }, {
    key: "getNotifications",
    value: function () {
      var _getNotifications = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var notifications, notifictions;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _notification["default"].find();
            case 2:
              notifications = _context8.sent;
              notifictions = notifications.filter(function (notif) {
                return notif.user === null;
              });
              return _context8.abrupt("return", notifictions);
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function getNotifications() {
        return _getNotifications.apply(this, arguments);
      }
      return getNotifications;
    }()
  }, {
    key: "getNotificationsByUser",
    value: function () {
      var _getNotificationsByUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(userid) {
        var notifications;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _notification["default"].find({
                user: userid
              });
            case 2:
              notifications = _context9.sent;
              return _context9.abrupt("return", notifications);
            case 4:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function getNotificationsByUser(_x9) {
        return _getNotificationsByUser.apply(this, arguments);
      }
      return getNotificationsByUser;
    }()
  }, {
    key: "updateLoan",
    value: function () {
      var _updateLoan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(_id, body) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  _loan["default"].findOne({
                    _id: _id
                  }, function (err, loan) {
                    if (err) {
                      console.error(err);
                    } else {
                      _loan["default"].updateOne({
                        _id: loan._id
                      }, {
                        $set: body
                      }, /*#__PURE__*/function () {
                        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(err, update) {
                          var result;
                          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                            while (1) switch (_context10.prev = _context10.next) {
                              case 0:
                                if (!err) {
                                  _context10.next = 4;
                                  break;
                                }
                                console.error(err);
                                _context10.next = 8;
                                break;
                              case 4:
                                _context10.next = 6;
                                return _loan["default"].findOne({
                                  _id: _id
                                });
                              case 6:
                                result = _context10.sent;
                                resolve({
                                  message: 'success',
                                  type: 'admin item update',
                                  content: result
                                });
                              case 8:
                              case "end":
                                return _context10.stop();
                            }
                          }, _callee10);
                        }));
                        return function (_x12, _x13) {
                          return _ref5.apply(this, arguments);
                        };
                      }());
                    }
                  });
                } catch (error) {
                  reject({
                    message: 'error',
                    type: 'admin item update',
                    reason: error
                  });
                }
              }));
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function updateLoan(_x10, _x11) {
        return _updateLoan.apply(this, arguments);
      }
      return updateLoan;
    }()
  }, {
    key: "updateInvestmentplan",
    value: function () {
      var _updateInvestmentplan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(_id, body) {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  _investmentplan["default"].findOne({
                    _id: _id
                  }, function (err, investmentplan) {
                    if (err) {
                      console.error(err);
                    } else {
                      _investmentplan["default"].updateOne({
                        _id: investmentplan._id
                      }, {
                        $set: body
                      }, /*#__PURE__*/function () {
                        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(err, update) {
                          var result;
                          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                            while (1) switch (_context12.prev = _context12.next) {
                              case 0:
                                if (!err) {
                                  _context12.next = 4;
                                  break;
                                }
                                console.error(err);
                                _context12.next = 8;
                                break;
                              case 4:
                                _context12.next = 6;
                                return _investmentplan["default"].findOne({
                                  _id: _id
                                });
                              case 6:
                                result = _context12.sent;
                                resolve({
                                  message: 'success',
                                  type: 'admin item update',
                                  content: result
                                });
                              case 8:
                              case "end":
                                return _context12.stop();
                            }
                          }, _callee12);
                        }));
                        return function (_x16, _x17) {
                          return _ref6.apply(this, arguments);
                        };
                      }());
                    }
                  });
                } catch (error) {
                  reject({
                    message: 'error',
                    type: 'admin item update',
                    reason: error
                  });
                }
              }));
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      function updateInvestmentplan(_x14, _x15) {
        return _updateInvestmentplan.apply(this, arguments);
      }
      return updateInvestmentplan;
    }()
  }, {
    key: "updateSavingsplan",
    value: function () {
      var _updateSavingsplan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(_id, body) {
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              return _context15.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  _savingsplan["default"].findOne({
                    _id: _id
                  }, function (err, savingsplan) {
                    if (err) {
                      console.error(err);
                    } else {
                      _savingsplan["default"].updateOne({
                        _id: savingsplan._id
                      }, {
                        $set: body
                      }, /*#__PURE__*/function () {
                        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(err, update) {
                          var result;
                          return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                            while (1) switch (_context14.prev = _context14.next) {
                              case 0:
                                if (!err) {
                                  _context14.next = 4;
                                  break;
                                }
                                console.error(err);
                                _context14.next = 8;
                                break;
                              case 4:
                                _context14.next = 6;
                                return _savingsplan["default"].findOne({
                                  _id: _id
                                });
                              case 6:
                                result = _context14.sent;
                                resolve({
                                  message: 'success',
                                  type: 'admin item update',
                                  content: result
                                });
                              case 8:
                              case "end":
                                return _context14.stop();
                            }
                          }, _callee14);
                        }));
                        return function (_x20, _x21) {
                          return _ref7.apply(this, arguments);
                        };
                      }());
                    }
                  });
                } catch (error) {
                  reject({
                    message: 'error',
                    type: 'admin item update',
                    reason: error
                  });
                }
              }));
            case 1:
            case "end":
              return _context15.stop();
          }
        }, _callee15);
      }));
      function updateSavingsplan(_x18, _x19) {
        return _updateSavingsplan.apply(this, arguments);
      }
      return updateSavingsplan;
    }()
  }, {
    key: "updateNotification",
    value: function () {
      var _updateNotification = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(_id, body) {
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              return _context17.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  _notification["default"].findOne({
                    _id: _id
                  }, function (err, notification) {
                    if (err) {
                      console.error(err);
                    } else {
                      _notification["default"].updateOne({
                        _id: notification._id
                      }, {
                        $set: body
                      }, /*#__PURE__*/function () {
                        var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(err, update) {
                          var result;
                          return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                            while (1) switch (_context16.prev = _context16.next) {
                              case 0:
                                if (!err) {
                                  _context16.next = 4;
                                  break;
                                }
                                console.error(err);
                                _context16.next = 8;
                                break;
                              case 4:
                                _context16.next = 6;
                                return _notification["default"].findOne({
                                  _id: _id
                                });
                              case 6:
                                result = _context16.sent;
                                resolve({
                                  message: 'success',
                                  type: 'admin item update',
                                  content: result
                                });
                              case 8:
                              case "end":
                                return _context16.stop();
                            }
                          }, _callee16);
                        }));
                        return function (_x24, _x25) {
                          return _ref8.apply(this, arguments);
                        };
                      }());
                    }
                  });
                } catch (error) {
                  reject({
                    message: 'error',
                    type: 'admin item update',
                    reason: error
                  });
                }
              }));
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee17);
      }));
      function updateNotification(_x22, _x23) {
        return _updateNotification.apply(this, arguments);
      }
      return updateNotification;
    }()
  }, {
    key: "deleteLoan",
    value: function () {
      var _deleteLoan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(_id) {
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  _loan["default"].deleteOne({
                    _id: _id
                  }, function (err, loan) {
                    if (err) {
                      reject({
                        message: 'error',
                        type: 'admin item delete',
                        reason: err
                      });
                    } else {
                      var result = "Deleted Loan with ID ".concat(_id);
                      resolve({
                        message: 'success',
                        type: 'admin item update',
                        content: result
                      });
                    }
                  });
                } catch (error) {
                  reject({
                    message: 'error',
                    type: 'admin item delete',
                    reason: error
                  });
                }
              }));
            case 1:
            case "end":
              return _context18.stop();
          }
        }, _callee18);
      }));
      function deleteLoan(_x26) {
        return _deleteLoan.apply(this, arguments);
      }
      return deleteLoan;
    }()
  }, {
    key: "deleteInvestmentPlan",
    value: function () {
      var _deleteInvestmentPlan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(_id) {
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              return _context19.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  _investmentplan["default"].deleteOne({
                    _id: _id
                  }, function (err, investmentplan) {
                    if (err) {
                      reject({
                        message: 'error',
                        type: 'admin item delete',
                        reason: err
                      });
                    } else {
                      var result = "Deleted Investmentplan with ID ".concat(_id);
                      resolve({
                        message: 'success',
                        type: 'admin item update',
                        content: result
                      });
                    }
                  });
                } catch (error) {
                  reject({
                    message: 'error',
                    type: 'admin item delete',
                    reason: error
                  });
                }
              }));
            case 1:
            case "end":
              return _context19.stop();
          }
        }, _callee19);
      }));
      function deleteInvestmentPlan(_x27) {
        return _deleteInvestmentPlan.apply(this, arguments);
      }
      return deleteInvestmentPlan;
    }()
  }, {
    key: "deleteSavingsPlan",
    value: function () {
      var _deleteSavingsPlan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(_id) {
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  _savingsplan["default"].deleteOne({
                    _id: _id
                  }, function (err, savingsplan) {
                    if (err) {
                      reject({
                        message: 'error',
                        type: 'admin item delete',
                        reason: err
                      });
                    } else {
                      var result = "Deleted Savingsplan with ID ".concat(_id);
                      resolve({
                        message: 'success',
                        type: 'admin item update',
                        content: result
                      });
                    }
                  });
                } catch (error) {
                  reject({
                    message: 'error',
                    type: 'admin item delete',
                    reason: error
                  });
                }
              }));
            case 1:
            case "end":
              return _context20.stop();
          }
        }, _callee20);
      }));
      function deleteSavingsPlan(_x28) {
        return _deleteSavingsPlan.apply(this, arguments);
      }
      return deleteSavingsPlan;
    }()
  }, {
    key: "deleteNotification",
    value: function () {
      var _deleteNotification = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(_id) {
        return _regeneratorRuntime().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              return _context21.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  _notification["default"].deleteOne({
                    _id: _id
                  }, function (err, notification) {
                    if (err) {
                      reject({
                        message: 'error',
                        type: 'admin item delete',
                        reason: err
                      });
                    } else {
                      var result = "Deleted Notification with ID ".concat(_id);
                      resolve({
                        message: 'success',
                        type: 'admin item update',
                        content: result
                      });
                    }
                  });
                } catch (error) {
                  reject({
                    message: 'error',
                    type: 'admin item delete',
                    reason: error
                  });
                }
              }));
            case 1:
            case "end":
              return _context21.stop();
          }
        }, _callee21);
      }));
      function deleteNotification(_x29) {
        return _deleteNotification.apply(this, arguments);
      }
      return deleteNotification;
    }()
  }]);
  return ItemEditor;
}();
var _default = exports["default"] = ItemEditor;