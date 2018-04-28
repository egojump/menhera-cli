import parser from "yargs-parser";
import { $set, $get, $ } from "menhera";
import chalk from "chalk";
import { genOutput, ENV } from "./utils";

export const commands = {
  $({ _, _key, _val, cp }) {
    const {
      alias: { commands: commandAlias },
      config: { rootAlias }
    } = this;
    let { name, args = [], alias, examples = {}, desc: cDesc = "", options = {} } = _val;
    let key = name || _key;

    this.commands[key] = _val;
    if (alias) {
      this.alias.commands[key] = alias;
      this.alias.commands[alias] = key;
    }
    examples && $set(this.examples, examples);

    let commandOutput = [];
    args = args.map(argv => `[${argv}]`);
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

    let examplesOutput = [];
    $(examples, (key, val) => {
      examplesOutput.push(
        `${genOutput({
          input: `${key}`,
          chalkFn: chalk.magenta,
          length: 20,
          left: 2
        })}${genOutput({ input: `${val}`, chalkFn: chalk.grey, length: 50 })}\n`
      );
    });

    let optionOutput = [];
    $(options, (key, val) => {
      const { alias, desc: oDesc } = val;
      this.alias.options[key] = alias;
      this.alias.options[alias] = key;

      optionOutput.push(
        `${genOutput({
          input: `-${alias}`,
          chalkFn: chalk.grey,
          length: 6,
          left: 12
        })}${genOutput({
          input: `--${key}`,
          chalkFn: chalk.grey,
          length: 50
        })}${genOutput({
          input: oDesc,
          chalkFn: chalk.grey,
          length: 10
        })}\n`
      );
    });

    $set(this.helper, {
      [key]: {
        examplesOutput,
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
      alias: { options: optionAlias, commands: commandAlias },
      config: { target, rootAlias, version }
    } = this;

    let { _: __, ...options } = parser(target || process.argv.slice(2));
    let [_key = rootAlias, ...args] = __;
    let command = this.commands[_key] || this.commands[commandAlias[_key]] || {};

    const { args: _args = [], exec = () => {}, options: _options = {} } = command;
    $(_options, (key, val) => {
      let _default = _options[key].default;
      this.args[key] = _default;
      let alias = optionAlias[key];
      alias && (this.args[alias] = _default);
    });
    $(options, (key, val) => {
      this.args[key] = val;
      let alias = optionAlias[key];
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
    alias: { commands: commandAlias },
    config: { rootAlias }
  } = this;

  if (_val !== rootAlias) {
    help = this.helper[_val] || this.helper[commandAlias[_val]];
  } else {
    help = {
      commandOutput: Object.values(this.helper).map(help => help.commandOutput),
      optionOutput: this.helper[rootAlias].optionOutput
    };
  }
  if (!help) return;
  console.log(`

${chalk.grey("Commands:")}

${help.commandOutput.join("")}

${chalk.grey("Options:")}

${help.optionOutput.join("")}
    `);
}

export function usage({ _val }) {
  const {
    alias: { commands: commandAlias }
  } = this;
  let help = this.helper[_val] || this.helper[commandAlias[_val]];
  help &&
    console.log(` 
  
${chalk.grey("Usage:")}
              
${help.commandOutput.join("")}
    `);
}

export function examples({ _val }) {
  const {
    config: { rootAlias }
  } = this;
  help = {
    examplesOutput: Object.values(this.helper).map(help => help.examplesOutput.join(""))
  };

  console.log(`

${chalk.grey("Examples:")}
              
${help.examplesOutput.join("")}
  `);
}
