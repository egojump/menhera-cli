#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menhera = require("menhera");

var _menhera2 = _interopRequireDefault(_menhera);

var _menheraCli = require("menhera-cli");

var _menheraCli2 = _interopRequireDefault(_menheraCli);

var _options = require("./options");

var _options2 = _interopRequireDefault(_options);

var _commands = require("./commands");

var commands = _interopRequireWildcard(_commands);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _menhera2.default({
  _mount: {
    cli: [_menheraCli2.default]
  },
  CLI: {
    options: _options2.default,
    commands: commands,
    config: {
      version: "0.0.1"
    }
  }
});