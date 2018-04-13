#!/usr/bin/env node
"use strict";

var _menhera = require("menhera");

var _menhera2 = _interopRequireDefault(_menhera);

var _menheraCli = require("menhera-cli");

var _menheraCli2 = _interopRequireDefault(_menheraCli);

var _options = require("./options");

var _options2 = _interopRequireDefault(_options);

var _commands = require("./commands");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = new _menhera2.default({
  _mount: {
    cli: [_menheraCli2.default]
  },
  CLI: {
    options: _options2.default,
    commands: {
      _: _commands.basic,
      serve: _commands.serve,
      test: _commands.test
    }
  }
}).$use({
  CLI: {
    config: {
      version: "0.0.1",
      start: true
    }
  }
});