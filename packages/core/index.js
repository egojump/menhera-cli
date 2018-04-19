import { EventEmitter } from "events";
import { $get } from "menhera";
import * as CLI from "./hooks";

export default {
  name: "CLI",
  Event: new EventEmitter(),
  options: {},
  args: {},
  commands: {},
  messages: {},
  helper: {},
  _hooks: {
    CLI
  },
  config: {
    version: "0.0.1",
    rootAlias: "_"
  }
};
