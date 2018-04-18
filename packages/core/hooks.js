import parser from "yargs-parser";
import { $, $set, $get } from "menhera";
import chalk from "chalk";
import { Init } from "./config";
import { genOutput } from "./utils";

export const commands = {
  $({ _key, _val, cp }) {
    const {
      inject,
      config: { rootAlias }
    } = this;
    $set(_val, inject);
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
          length: 30
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
          length: 25
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
    _.$use(Init(this));

    let { _: __, ...options } = parser(target || process.argv.slice(2));
    let [_key = rootAlias, ..._args] = __;
    $(options, (key, val) => {
      this.args[key] = val;
      const alias = this.options[key];
      if (alias) {
        this.args[alias] = val;
      }
    });

    let command = this.commands[_key];
    const { args = [] } = command;
    args.forEach((argv, i) => {
      this.args[argv] = _args[i];
    });

    let out = { _, ...this, ...this.args, _key };
    const { execs = {} } = command;
    $(execs, (_key, val) => {
      let key = _key.split(",");
      let check = key.every(k => {
        if (k.startsWith("!")) {
          const [symbol, o] = k;
          return out[o] === undefined;
        }
        return out[k] !== undefined;
      });
      check && val(out);
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
