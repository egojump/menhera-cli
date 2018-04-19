import { EventEmitter } from "events";
import { $get } from "menhera";
import * as CLI from "./hooks";
import { inject } from "./config";

export default {
  name: "CLI",
  Event: new EventEmitter(),
  options: {},
  args: {},
  commands: {},
  messages: {},
  inject,
  helper: {},
  _hooks: {
    CLI
  },
  config: {
    version: "0.0.1",
    rootAlias: "*"
  }
};
