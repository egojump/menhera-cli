import Menhera from "menhera";
import CLI from "../core";

import { join } from "path";
import { init } from "./commands";

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    options: {},
    commands: {
      "init [projectName]": init
    }
  }
});

_.$use({
  CLI: {
    config: {
      version: "0.0.1",
      templatePath: join(__dirname, "../../.templates")
    }
  }
});

export default _;
