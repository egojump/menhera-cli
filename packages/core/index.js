import { EventEmitter } from "events";
import * as CLI from "./hooks";
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
    CLI
  },
  config: {
    version: "0.0.1",
    rootAlias: "*"
  }
};
