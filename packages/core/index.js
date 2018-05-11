import path from "path";
import * as CLI from "./hooks";
import * as commands from "./commands";
import { data, methods } from "menhera-utils";
import { ENV, HV } from "./middlewares";

export default ({ version }) => ({
  name: "CLI",
  _hooks: {
    data,
    methods,
    CLI
  },
  data: {
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
    middlewares: {},
    helper: {},
    config: {
      name: "CLI",
      package: require(path.join(__dirname, "../package.json")) || {},
      rootAlias: "_"
    }
  },
  CLI: {
    commands,
    use: {
      rootMiddlewares: [ENV, HV]
    }
  }
});
