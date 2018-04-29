import { EVENTS } from "menhera";
import chalk from "chalk";

export const examples = {
  desc: "Examples",
  alias: "e",
  args: ["example"],
  async exec(data) {
    const { _, env, example, CLI } = data;
    const {
      config: { name, rootAlias },
      examples
    } = CLI;
    if (env.NONE_INPUTS) {
      _.$use({ [`${name}.examples`]: rootAlias });
      return;
    }

    let val = examples[example];
    let target = val.split(" ");

    console.log(chalk.grey(`>>> ${name} ${val}`));

    _.$use({ [name]: { config: { target, start: true } } });
  }
};
