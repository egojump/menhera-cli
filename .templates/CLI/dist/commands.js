"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ = exports._ = {
  exec: function exec(_ref) {
    var _ = _ref._,
        h = _ref.h,
        commands = _ref.CLI.commands;

    _.$use({
      CLI: {
        call: {
          help: true
        }
      }
    });
  }
};

var serve = exports.serve = {
  desc: "run serve on port",
  args: ["port"],
  exec: function exec(_ref2) {
    var port = _ref2.port;

    console.log("server running on port:" + port);
  }
};

var test = exports.test = {
  desc: "test desc",
  exec: function exec(_ref3) {
    var test = _ref3.test;

    test && console.log(test);
  }
};