import path from "path";
import { forceDownload } from "./utils";

export const _ = {
  exec({ _, _key, env }) {
    if (env.NONE_INPUTS) {
      _.$use({ CLI: { help: _key } });
    }
  }
};

export const init = {
  desc: "Init Project",
  alias: "i",
  args: ["templateName", "projectName"],
  examples: {
    "init:cli": "init uu-z/template-cli mycli",
    "init:module": "init uu-z/template-module mymodule"
  },
  options: { clone: { alias: "c", desc: "clone repo", default: false } },
  async exec(ctx) {
    const { _, _key, templateName, projectName, clone, h, env } = ctx;
    if (env.NONE_INPUTS) {
      _.$use({ CLI: { help: _key } });
      return;
    }
    if (env.NONE_FULL_ARGS) {
      _.$use({ CLI: { usage: _key } });
      return;
    }
    let desc = path.join(process.cwd(), projectName);
    _.$use({
      Message: {
        spinner: {
          mode: "random",
          text: "downloading...",
          status: "start"
        }
      }
    });
    let download = {};
    (await forceDownload(templateName, desc, {
      clone
    }))
      ? (download.fail = true)
      : (download.success = { templateName, projectName });
    _.$use({
      Message: {
        download,
        spinner: { status: "stop" }
      }
    });
  }
};
