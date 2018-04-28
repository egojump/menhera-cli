#!/usr/bin/env node
import Menehra from "menhera";
import CLI from "../core";
import * as messages from "./messages";
import * as commands from "./commands";
import Message from "menhera-message";

const Mhr = CLI({ name: "Mhr", version: "0.0.1" });

export default Menehra.$use({
  _mount: {
    Mhr,
    Message
  },
  messages,
  Mhr: {
    commands,
    config: {
      start: true
    }
  }
});
