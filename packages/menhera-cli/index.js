import Menhera from "menhera";
import CLI from "../core";
import options from "./options";
import * as commands from "./commands";

import { join } from "path";

export default new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    options,
    commands,
    config: {
      version: "0.0.1",
      templatePath: join(__dirname, "../../.templates")
    }
  }
});
