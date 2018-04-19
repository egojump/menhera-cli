import Menhera from "menhera";
import CLI from "../core";
import path from "path";
import { forceDownload, Message } from "./utils";
import * as messages from "./messages";

export default new Menhera({
  _mount: {
    CLI
  },
  CLI: {
    messages,
    commands: {
      init: {
        desc: "Init Project",
        args: ["templateName", "projectName"],
        options: {
          clone: {
            alias: "c",
            desc: "clone repo"
          }
        },
        execs: {
          async _(data) {
            const { _, _key: usage, $0, $1, clone = false } = data;
            if (!$1) {
              return _.$use({ CLI: { usage } });
            }
            let desc = path.join(process.cwd(), $1);
            let err = await forceDownload($0, desc, { clone });
            _.$use({
              CLI: { Message: { download: err ? "fail" : "success" } }
            });
          }
        }
      }
    }
  }
}).$use({
  CLI: {
    config: {
      name: "mhr",
      version: "0.0.1"
    }
  }
});
