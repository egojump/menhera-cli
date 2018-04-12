import prompts from "prompts";
import parser from "yargs-parser";
import chalk from "chalk";
const { isArray } = Array;
const { entries } = Object;

let rootAlias = "_";
const commandRegex = /\.*[\][<>]/g;
const genSpace = (space, fill) => Array.from(new Array(space -  fill)).join(" ")
const useInit = {
  CLI: {
    options: {
      v: {
        alias: "version",
        desc: "version"
      },
      h: {
        alias: "help",
        desc: "help"
      }
    },
    commands: {
      _: {
        exec({ v, CLI: { config: { version } } }) {
          v && console.log(version);
        }
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
	},
	$({_key,_val,cp}){
		const {alias, desc} = _val
		let keyLength = _key.length
		let aliasLength = alias.length
		const output = `  -${chalk.grey(_key)}${genSpace(8, keyLength)}--${chalk.grey(alias)}${genSpace(28, aliasLength)}${chalk.grey(desc)}\n`
		this.sugar.optionList.push(output)
	}
};


export const commands = {
  $({ _key, _val, cp }) {
    let { exec, args = [], desc } = _val;
    this.commands[_key] = _val;
    this.Event.on(_key, exec);
    if (_key !== rootAlias) {
			args = args.map(argv => `[${argv}]`);
			let keyLength = _key.length
			let argsLength = args.join(" ").length
			const output = `  ${chalk.magenta(_key)}${genSpace(8, keyLength)}${chalk.gray(args.join(" "))}${genSpace(30, argsLength)} ${chalk.grey(desc)} \n`;
      this.sugar.commandList.push(output);
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
    let [_key = rootAlias, ..._args] = __;
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

export const call = {
  help({ _val }) {
		console.log(`
${chalk.grey("Commands:")}

${this.sugar.commandList.join("")}

${chalk.grey("Options:")}

${this.sugar.optionList.join("")}
    `);
  }
};
