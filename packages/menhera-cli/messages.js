import chalk from "chalk";

export const download = {
  fail: `

sorry, download failed. 
      `,
  success: ({ args: { projectName, templateName } }) =>
    chalk.green(`
Success! Created <${projectName}> with template <${templateName}>

We suggest that you begin by typing:

  $ cd ${projectName}
  $ yarn install

  Happy hacking!
`)
};
