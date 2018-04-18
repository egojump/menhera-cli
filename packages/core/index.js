import { EventEmitter } from "events";
import * as CLI from "./hooks";

export default {
  name: "CLI",
  Event: new EventEmitter(),
  options: {},
  args: {},
  commands: {},
  config: {},
  helper: {},
  _hooks: {
    CLI
  }
};
