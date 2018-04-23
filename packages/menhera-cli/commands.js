import path from "path";
import { forceDownload, Message } from "./utils";

export const _ = {
  exec({ _, _key, env }) {
    if (env.NONE_INPUTS) {
      _.$use({ CLI: { help: _key } });
    }
  }
};

export const init = {
  desc: "Init Project",
  args: ["templateName", "projectName"],
  options: {
    clone: {
      alias: "c",
      desc: "clone repo"
    }
  },
  async exec(data) {
    const { _, _key, templateName, projectName, clone = false, h, env } = data;
    if (env.NONE_INPUTS) {
      _.$use({ CLI: { help: _key } });
      return;
    }
    if (env.NONE_FULL_ARGS) {
      _.$use({ CLI: { usage: _key } });
      return;
    }

    let desc = path.join(process.cwd(), projectName);
    let err = await forceDownload(templateName, desc, { clone });
    _.$use({
      CLI: { Message: { download: err ? "fail" : "success" } }
    });
  }
};
