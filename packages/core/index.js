import * as CLI from "./hooks";
import * as commands from "./commands";

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
  examples: {},
  helper: {},
  _hooks: {
    CLI
  },
  config: {
    version: "0.0.1",
    rootAlias: "_"
  },
  CLI: {
    commands
  }
};
