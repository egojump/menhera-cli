import { root } from "postcss";

export const examples = {
  desc: "Examples",
  alias: "e",
  args: ["key"],
  async exec(data) {
    const { _, env, key, CLI } = data;
    const {
      config: { name, rootAlias },
      examples
    } = CLI;
    if (env.NONE_INPUTS) {
      _.$use({ "CLI.examples": rootAlias });
      return;
    }

    let val = examples[key];
    let target = val.split(" ");

    _.$use({ CLI: { config: { target, start: true } } });
  }
};
