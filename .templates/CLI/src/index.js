#!/usr/bin/env node

import Menhera from "menhera";
import CLI from "menhera-cli";
import options from "./options";
import { basic, serve, test } from "./commands";

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    options,
    commands: {
      _: basic,
      serve,
      test
    }
  }
}).$use({
  CLI: {
    config: {
      version: "0.0.1",
      start: true
    }
  }
});
