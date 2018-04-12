import { EventEmitter } from "events";
import parser from "yargs-parser";
import { _prompts, options, commands, config } from "./plugin";
const { isArray } = Array;
const { entries } = Object;

const commandRegex = /\.*[\][<>]/g;
const useInit = {
  CLI: {
    options: {
      v: {
        alias: "version",
        desc: "version"
      },
      h: {
        alias: "help",
        decs: "help"
      }
    },
    commands: {
      "*"({ v, CLI: { config: { version } } }) {
        v && console.log(version);
      }
    }
  }
};

export * from "./plugin";

export default {
  name: "CLI",
  Event: new EventEmitter(),
  options: {},
  args: {},
  commands: {},
  config: {},
  _hooks: {
    CLI: {
      prompts: _prompts,
      options,
      commands,
      config
    }
  }
};
