import prompts from "prompts";
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

export const _prompts = {
  _({ _, _val }) {
    const { input, then } = _val;
    prompts(input).then(res => then({ res, _, CLI: this }));
  }
};

export const options = {
  _({ _key, _val, cp }) {
    Object.assign(this.options, _val);
  }
};

export const commands = {
  $({ _key, _val, cp }) {
    // const { exec, ...other } = _val;
    if (commandRegex.test(_key)) {
      const [command, ...other] = _key.replace(commandRegex, "").split(" ");
      this.commands[command] = { args: other };
      this.Event.on(command, _val);
    } else {
      this.Event.on(_key, _val);
    }
  }
};

export const config = {
  _({ _val }) {
    Object.assign(this.config, _val);
  },
  start({ _, _val }) {
    const { target } = this.config;
    _.$use(useInit);

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
    this.Event.emit(_key, { _, CLI: this, ...this.args });
  }
};
