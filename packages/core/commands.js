import { exec } from "child_process";

export const examples = {
  desc: " examples",
  alias: "e",
  args: ["key"],
  exec() {
    console.log("examples");
  }
};
