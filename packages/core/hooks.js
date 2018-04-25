import parser from "yargs-parser";
import { $set, $get, $ } from "menhera";
import chalk from "chalk";
import { genOutput, ENV } from "./utils";

export const plugins = {
  $({ _key, _val, cp }) {}
};

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
      this.alias[option] = alias;
      this.alias[alias] = option;

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
    let [_key = rootAlias, ...args] = __;
    $(options, (key, val) => {
      this.args[key] = val;
      const alias = this.alias[key];
      if (alias) {
        this.args[alias] = val;
      }
    });

    let command = this.commands[_key] || {};
    const { args: _args = [] } = command;
    _args.forEach((argv, i) => {
      this.args[argv] = args[i];
    });
    args.forEach((argv, i) => {
      this.args[`$${i}`] = args[i];
    });

    let out = { _, CLI: this, ...this.args, _key, options, args };
    let val = { ...out, env: ENV({ ...out, _args }) };
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
  if (_val !== rootAlias || !_val) {
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

// export const Message = {
//   $({ _key, _val }) {
//     const messages = this.messages[_key] || {};
//     let val = { CLI: this, _key, _val };
//     if (typeof messages === "function") {
//       messages(val);
//       return;
//     }

//     const message = messages[_val] || "";

//     if (message) {
//       typeof message === "function" && message(val);
//       typeof message !== "function" && console.log(message);
//     } else {
//       console.log(`can not find message with key: ${_key} val: ${_val}`);
//     }
//   }
// };

// export const messages = {
//   _({ _val }) {
//     this.messages = Object.assign({}, this.messages, _val);
//   }
// };
