import { EventEmitter } from "events";
import { _prompts, options, commands, config, call } from "./plugin";

export * from "./plugin";

export default {
  name: "CLI",
  Event: new EventEmitter(),
  options: {},
  args: {},
  commands: {},
  config: {},
  sugar: {
    commandList: [],
    optionList:[]
  },
  _hooks: {
    CLI: {
      prompts: _prompts,
      options,
      commands,
      config,
      call
    }
  }
};
