import { EventEmitter } from "events";
import parser from "yargs-parser";
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

export default {
  name: "CLI",
  Event: new EventEmitter(),
  options: {},
  args: {},
  commands: {},
  config: {},
  _hooks: {
    CLI: {
      options: {
        _({ _key, _val, cp }) {
          Object.assign(this.options, _val);
        }
      },
      commands: {
        $({ _key, _val, cp }) {
          // const { exec, ...other } = _val;
          if (commandRegex.test(_key)) {
            const [command, ...other] = _key
              .replace(commandRegex, "")
              .split(" ");
            this.commands[command] = {
              args: other
            };
            this.Event.on(command, _val);
          } else {
            this.Event.on(_key, _val);
          }
        }
      },
      config: {
        _({ _, _val }) {
          const { start, target } = _val;
          Object.assign(this.config, _val);
          _.$use(useInit);

          if (start) {
            let { _: __, ...options } = parser(target || process.argv.slice(2));
            let [_key = "*", ..._args] = __;
            for (let [key, val] of entries(options)) {
              this.args[key] = val;
              const { alias } = this.options[key] || {};
              if (alias) {
                this.args[alias] = val;
              }
            }
            const { args = [] } = this.commands[_key] || {};
            args.forEach((argv, i) => {
              this.args[argv] = _args[i];
            });
            this.Event.emit(_key, {
              CLI: this,
              ...this.args
            });
          }
        }
      }
    }
  }
};
