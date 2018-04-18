import { EventEmitter } from "events";
import { $get } from "menhera";
import { commands, config, help } from "./hooks";
import { inject } from "./config";

export default {
  name: "CLI",
  Event: new EventEmitter(),
  options: {},
  args: {},
  commands: {},
  inject,
  helper: {},
  _hooks: {
    CLI: {
      commands,
      config,
      help
    }
  },
  config: {
    version: "0.0.1",
    rootAlias: "*"
  }
};
