import { EVENTS } from "menhera";

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

    _.$use({ CLI: { config: { target, start: true } } });
  }
};
