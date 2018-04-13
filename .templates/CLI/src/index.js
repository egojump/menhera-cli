#!/usr/bin/env node

import Menhera from "menhera";
import CLI from "menhera-cli";
import options from "./options";
import * as commands from "./commands";

export default new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    options,
    commands,
    config: {
      version: "0.0.1"
    }
  }
});
