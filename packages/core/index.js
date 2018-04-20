import { EventEmitter } from "events";
import { $get } from "menhera";
import * as CLI from "./hooks";

export default {
  name: "CLI",
  Event: new EventEmitter(),
  alias: {
    help: "h",
    h: "help",
    version: "v",
    v: "version"
  },
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
