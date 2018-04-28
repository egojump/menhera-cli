import * as CLI from "./hooks";
import * as commands from "./commands";

export default {
  name: "CLI",
  alias: {
    options: {
      help: "h",
      h: "help",
      version: "v",
      v: "version",
      examples: "e",
      e: "examples"
    },
    commands: {}
  },
  args: {},
  commands: {},
  examples: {},
  helper: {},
  _hooks: {
    CLI
  },
  config: {
    name: "cli",
    version: "0.0.1",
    rootAlias: "_"
  },
  CLI: {
    commands
  }
};
