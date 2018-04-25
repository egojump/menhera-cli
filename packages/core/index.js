import { $get } from "menhera";
import * as CLI from "./hooks";

export default {
  name: "CLI",
  alias: {
    help: "h",
    h: "help",
    version: "v",
    v: "version"
  },
  args: {},
  commands: {},
  helper: {},
  _hooks: {
    CLI
  },
  config: {
    version: "0.0.1",
    rootAlias: "_"
  }
};
