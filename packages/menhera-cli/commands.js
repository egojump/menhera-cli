import fs from "fs-extra";
import chalk from "chalk";
import { join } from "path";

export const basic = {
  exec({ _, h, CLI: { commands } }) {
    _.$use({
      CLI: {
        call: {
          help: true
        }
      }
    });
  }
};

export const init = {
  desc: "init with template",
  args: ["projectName"],
  exec({ _, projectName = "my-project", CLI: { config: { templatePath } } }) {
    let realTemplatePath = templatePath;
    let templates = fs.readdirSync(realTemplatePath);
    let TemplateChoices = templates.map(template => {
      return { title: template, value: template };
    });

    _.$use({
      CLI: {
        prompts: {
          input: {
            type: "select",
            name: "template",
            message: "select a template",
            choices: TemplateChoices
          },
          then({ res: { template } }) {
            let finalTemplatePath = join(realTemplatePath, template);
            let finalProjectPath = join(process.cwd(), projectName);
            fs.copySync(finalTemplatePath, finalProjectPath);
            console.log(
              chalk.green(
                `
Success! Created <${projectName}> with template <${template}>

We suggest that you begin by typing:
  $ cd ${projectName}
  $ yarn install
  
When you installed dependencies that you can typing:
  $ yarn start
  $ yarn run build

  Happy hacking!
`
              )
            );
          }
        }
      }
    });
  }
};
