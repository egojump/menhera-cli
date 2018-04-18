import _prompts from "prompts";
import parser from "yargs-parser";
import { $, $set } from "menhera";
import chalk from "chalk";
const { isArray } = Array;
const { entries } = Object;

let rootAlias = "_";
const commandRegex = /\.*[\][<>]/g;
const genSpace = (space, fill) => Array.from(new Array(space - fill)).join(" ");
const useInit = ({ config }) => ({
  CLI: {
    commands: {
      _: {
        options: {
          version: {
            alias: "v",
            desc: "version"
          },
          help: {
            alias: "h",
            desc: "help"
          }
        },
        execs: {
          v({ _, config: { version } }) {
            console.log(version);
          }
        }
      }
    }
  }
});

export const prompts = {
  _({ _, _val }) {
    const { input, then } = _val;
    _prompts(input).then(res => then({ res, _, CLI: this }));
  }
};

export const options = {
  _({ _key, _val, cp }) {
    Object.assign(this.options, _val);
  },
  $({ _key, _val, cp }) {
    const { alias, desc } = _val;
    let keyLength = _key.length;
    let aliasLength = alias.length;
  }
};

export const commands = {
  $({ _key, _val, cp }) {
    let { name, exec, args = [], desc: cDesc, options = {} } = _val;
    let key = name || _key;

    this.commands[key] = _val;

    args = args.map(argv => `[${argv}]`);
    let keyLength = key.length;
    let argsLength = args.join(" ").length;
    const commandOutput = `  ${chalk.magenta(key)}${genSpace(
      8,
      keyLength
    )}${chalk.gray(args.join(" "))}${genSpace(30, argsLength)} ${chalk.grey(
      cDesc
    )} \n`;

    let optionOutput = [];

    $(options, (option, val) => {
      const { alias, desc: oDesc } = val;
      let aliasLength = alias.length;
      let optionLength = option.length;

      optionOutput.push(
        `${genSpace(11, " ")}-${chalk.grey(alias)}${genSpace(
          4,
          ""
        )}--${chalk.grey(option)}${genSpace(24, optionLength)}${chalk.grey(
          oDesc
        )}\n`
      );
    });

    this.helper[key] = {
      optionOutput,
      commandOutput
    };
  }
};

export const config = {
  _({ _val }) {
    Object.assign(this.config, _val);
  },
  start({ _, _val }) {
    const { target } = this.config;
    _.$use(useInit({ ...this }));

    let { _: __, ...options } = parser(target || process.argv.slice(2));
    let [_key = rootAlias, ..._args] = __;

    let command = this.commands[_key];
    const { execs = {} } = command;
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

    let out = { _, ...this, ...this.args };
    _.$use({ CLI: { onRun: { [_key]: out } } });
    $(execs, (_key, val) => {
      let key = _key.split("&&");
      let check = key.every(k => {
        return this.args[k] !== undefined;
      });

      if (check) {
        val(out);
      }
    });
  }
};

export const onRun = {
  $({ _, _key, _val }) {
    const { h } = _val;
    h &&
      _.$use({
        CLI: {
          help: _key
        }
      });
  }
};

export function help({ _val }) {
  let help = this.helper[_val];
  console.log(`
${chalk.grey("Commands:")}

${help.commandOutput}

${chalk.grey("Options:")}

${help.optionOutput.join("")}
    `);
}
