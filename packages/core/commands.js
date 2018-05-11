import { EVENTS } from "menhera";
import chalk from "chalk";

export const examples = {
  desc: "Examples",
  alias: "e",
  args: ["example"],
  async exec(data) {
    const { _, env, example, CLI } = data;
    const {
      config: { rootAlias },
      examples
    } = CLI;
    if (env.NONE_INPUTS) {
      _.$use({ [`CLI.examples`]: rootAlias });
      return;
    }

    let val = examples[example];
    let target = val.split(" ");

    console.log(chalk.grey(`>>> ${val}`));

    _.$use({ "CLI.config": { target, start: true } });
  }
};
