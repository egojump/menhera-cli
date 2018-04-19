import parser from "yargs-parser";
import { $, $set, $get } from "menhera";
import chalk from "chalk";
import { genOutput } from "./utils";

export const commands = {
  $({ _key, _val, cp }) {
    const {
      config: { rootAlias }
    } = this;
    let { name, args = [], desc: cDesc = "", options = {} } = _val;
    let key = name || _key;

    this.commands[key] = _val;

    let commandOutput = [];
    args = args.map(argv => `[${argv}]`);
    if (key !== rootAlias) {
      commandOutput.push(
        `${genOutput({
          input: `${key}`,
          chalkFn: chalk.magenta,
          length: 8,
          left: 2
        })}${genOutput({
          input: `${args.join(" ")}`,
          chalkFn: chalk.grey,
          length: 40
        })}${genOutput({
          input: `${cDesc}`,
          chalkFn: chalk.grey,
          length: 10
        })}\n`
      );
    }

    let optionOutput = [];
    $(options, (option, val) => {
      const { alias, desc: oDesc } = val;
      this.options[option] = alias;
      this.options[alias] = option;

      optionOutput.push(
        `${genOutput({
          input: `-${alias}`,
          chalkFn: chalk.grey,
          length: 5,
          left: 10
        })}${genOutput({
          input: `--${option}`,
          chalkFn: chalk.grey,
          length: 35
        })}${genOutput({
          input: oDesc,
          chalkFn: chalk.grey,
          length: 10
        })}\n`
      );
    });

    $set(this.helper, {
      [key]: {
        optionOutput,
        commandOutput
      }
    });
  }
};

export const config = {
  _({ _, _val }) {
    $set(this.config, _val);
  },
  start({ _, _val }) {
    const {
      config: { target, rootAlias }
    } = this;

    let { _: __, ...options } = parser(target || process.argv.slice(2));
    let [_key = rootAlias, ..._args] = __;
    $(options, (key, val) => {
      this.args[key] = val;
      const alias = this.options[key];
      if (alias) {
        this.args[alias] = val;
      }
    });

    let command = this.commands[_key] || {};
    const { args = [] } = command;
    args.forEach((argv, i) => {
      this.args[argv] = _args[i];
    });
    _args.forEach((argv, i) => {
      this.args[`$${i}`] = _args[i];
    });

    let val = { _, ...this, ...this.args, _key, options, args };
    const { exec = () => {} } = command;
    const { help, v } = val;
    if (help) {
      _.$use({ CLI: { help: _key } });
      return;
    }
    if (v) {
      const {
        config: { version }
      } = this;
      console.log(version);
      return;
    }

    exec(val);
  }
};

export function help({ _val }) {
  let help;
  const {
    config: { rootAlias }
  } = this;
  if (_val !== rootAlias) {
    help = this.helper[_val];
  } else {
    help = {
      commandOutput: Object.values(this.helper).map(help => help.commandOutput),
      optionOutput: this.helper[rootAlias].optionOutput
    };
  }
  console.log(`

${chalk.grey("Commands:")}

${help.commandOutput.join("")}

${chalk.grey("Options:")}

${help.optionOutput.join("")}
    `);
}

export function usage({ _val }) {
  let help = this.helper[_val];
  help &&
    console.log(` 
  
${chalk.grey("Usage:")}
              
    ${help.commandOutput.join("")}`);
}

export const Message = {
  $({ _key, _val }) {
    const messages = this.messages[_key] || {};
    const message = messages[_val] || "";

    if (message) {
      typeof message === "function" && console.log(message(this));
      typeof message !== "function" && console.log(message);
    } else {
      console.log(`can not find message with key: ${_key} val: ${_val}`);
    }
  }
};

export const messages = {
  _({ _val }) {
    Object.assign(this.messages, _val);
  }
};
