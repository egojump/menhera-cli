import * as CLI from "./hooks";
import * as commands from "./commands";

export default ({ name, version }) => ({
  name,
  alias: {
    options: {
      help: "h",
      h: "help",
      version: "v",
      v: "version"
    },
    commands: {
      examples: "e",
      e: "examples"
    }
  },
  args: {},
  commands: {},
  examples: {},
  helper: {},
  _hooks: {
    [name]: CLI
  },
  config: {
    name,
    version,
    rootAlias: "_"
  },
  [name]: {
    commands
  }
});
