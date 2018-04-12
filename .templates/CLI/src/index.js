#!/usr/bin/env node

import Menhera from "menhera";
// import CLI from "menhera-cli";
import CLI from "../../../packages/core"
import options from "./options";
import { basic, serve } from "./commands";

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    options,
    commands: {
      _: basic,
      serve: serve,
      test: {
        desc:"test desc",
        exec({ test }) {
          test && console.log(test);
        }
      }
    },
    config: {
      version: "0.0.1"
    }
  }
}).$use({
  CLI: {
    config: {
      start: true
    }
  }
});
