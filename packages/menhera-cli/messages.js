import chalk from "chalk";
import cliSpinner from "cli-spinners";
import ora from "ora";
import { RandomKeyFromObject, RandomKeyFromArray } from "./utils";

export const download = {
  fail: () =>
    console.log(`

sorry, download failed. 
      `),
  success: ({ projectName, templateName }) =>
    console.log(
      chalk.green(`
Success! Created <${projectName}> with template <${templateName}>

We suggest that you begin by typing:

  $ cd ${projectName}
  $ yarn install

  Happy hacking!
`)
    )
};

let colors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray"
];

let _spinner = null;
export const spinner = ({ _key, _val }) => {
  const { mode, type, text, color, status } = _val;
  if (status == "stop") {
    if (_spinner) {
      _spinner.stop();
    }
  }
  if (status == "start") {
    let args = {};
    if (mode === "random") {
      let randomSpinner = cliSpinner[RandomKeyFromObject(cliSpinner)];
      let color = RandomKeyFromArray(colors);
      args.spinner = randomSpinner;
      args.color = color;
    }
    color && (args.color = color);
    text && (args.text = text);
    cliSpinner[type] && (args.spinner = cliSpinner[type]);
    _spinner = new ora(args);

    _spinner.start();
  }
};
