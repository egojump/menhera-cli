import Menhera from "menhera";
import CLI from "../core";
import options from "./options";

import { join } from "path";
import { init, basic } from "./commands";

export default new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    options,
    commands: {
      _: basic,
      init
    },
    config: {
      version: "0.0.1",
      templatePath: join(__dirname, "../../.templates")
    }
  }
});
