import parser from "yargs-parser";
import { $, $set, $get } from "menhera";
import chalk from "chalk";
import { useInit } from "./config";
import { genSpace } from "./utils";
const { isArray } = Array;
const { entries } = Object;

export const commands = {
  $({ _key, _val, cp }) {
    const {
      inject,
      config: { rootAlias }
    } = this;
    $set(_val, inject);
    let { name, exec, args = [], desc: cDesc = "", options = {} } = _val;
    let key = name || _key;

    this.commands[key] = _val;
    let commandOutput = [];

    args = args.map(argv => `[${argv}]`);
    let keyLength = key.length;
    let argsLength = args.join(" ").length;
    if (key !== rootAlias) {
      commandOutput.push(
        `  ${chalk.magenta(key)}${genSpace(8, keyLength)}${chalk.gray(
          args.join(" ")
        )}${genSpace(30, argsLength)} ${chalk.grey(cDesc)} \n`
      );
    }

    let optionOutput = [];

    $(options, (option, val) => {
      const { alias, desc: oDesc } = val;
      let aliasLength = alias.length;
      let optionLength = option.length;
      this.options[option] = alias;
      this.options[alias] = option;

      optionOutput.push(
        `${genSpace(11, " ")}-${chalk.grey(alias)}${genSpace(
          4,
          ""
        )}--${chalk.grey(option)}${genSpace(24, optionLength)}${chalk.grey(
          oDesc
        )}\n`
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
  _({ _val }) {
    $set(this.config, _val);
  },
  start({ _, _val }) {
    const { target, rootAlias } = this.config;
    _.$use(useInit({ ...this }));

    let { _: __, ...options } = parser(target || process.argv.slice(2));
    let [_key = rootAlias, ..._args] = __;

    let command = this.commands[_key];
    const { execs = {} } = command;
    for (let [key, val] of entries(options)) {
      this.args[key] = val;
      const alias = this.options[key];
      if (alias) {
        this.args[alias] = val;
      }
    }
    const { args = [] } = this.commands[_key] || {};
    args.forEach((argv, i) => {
      this.args[argv] = _args[i];
    });

    let out = { _, ...this, ...this.args, _key };
    $(execs, (_key, val) => {
      let key = _key.split("&&");
      let check = key.every(k => {
        return out[k] !== undefined;
      });

      if (check) {
        val(out);
      }
    });
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
