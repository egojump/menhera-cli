import parser from "yargs-parser";
import { $set, $get, $ } from "menhera";
import chalk from "chalk";
import { genOutput, ENV } from "./utils";

export const commands = {
  $({ _, _key, _val, cp }) {
    const {
      config: { rootAlias }
    } = this;
    let { name, args = [], alias, examples, desc: cDesc = "", options = {} } = _val;
    let key = name || _key;
    let isAlias = alias && alias == key;

    this.commands[key] = _val;
    isAlias && _.$use({ "CLI.commands": { [alias]: _val } });
    examples && $set(this.examples, examples);

    let commandOutput = [];
    args = args.map(argv => `[${argv}]`);
    if (!isAlias) {
      if (key !== rootAlias) {
        commandOutput.push(
          `${genOutput({
            input: `${key}`,
            chalkFn: chalk.magenta,
            length: 12,
            left: 2
          })}${genOutput({
            input: `${alias || ""}`,
            chalkFn: chalk.magenta,
            length: 6
          })}${genOutput({
            input: `${args.join(" ")}`,
            chalkFn: chalk.grey,
            length: 50
          })}${genOutput({ input: `${cDesc}`, chalkFn: chalk.grey, length: 20 })}\n`
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
  }
};

export const config = {
  _({ _, _val }) {
    $set(this.config, _val);
  },
  start({ _, _val }) {
    const {
      config: { target, rootAlias, version }
    } = this;

    let { _: __, ...options } = parser(target || process.argv.slice(2));
    let [_key = rootAlias, ...args] = __;
    let command = this.commands[_key] || {};
    const { args: _args = [], exec = () => {}, options: _options = {} } = command;
    $(_options, (key, val) => {
      let _default = _options[key].default;
      this.args[key] = _default;
      let alias = this.alias[key];
      alias && (this.args[alias] = _default);
    });
    $(options, (key, val) => {
      this.args[key] = val;
      let alias = this.alias[key];
      alias && (this.args[alias] = val);
    });
    $(_args, (i, argv) => {
      this.args[argv] = args[i];
    });
    $(args, i => {
      this.args[`$${i}`] = args[i];
    });

    let val = { _, CLI: this, ...this.args, _key, options, args, _args };
    val.env = ENV(val);

    const { help, v } = val;
    if (help) {
      _.$use({ "CLI.help": _key });
      return;
    }
    if (examples) {
      _.$use({ "CLI.examples": _key });
      return;
    }
    if (version) {
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
