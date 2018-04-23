#!/usr/bin/env node
import Menhera from "menhera";
import CLI from "../core";
import * as messages from "./messages";
import * as commands from "./commands";

export default Menhera({
  _mount: {
    CLI
  },
  CLI: {
    messages,
    commands
  }
}).$use({
  CLI: {
    config: {
      name: "mhr",
      version: "0.0.1",
      start: true
    }
  }
});
