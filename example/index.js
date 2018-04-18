const Menhera = require("menhera").default;
const CLI = require("../packages/core").default;

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    commands: {
      serve: {
        name: "serve",
        options: {
          help: {
            alias: "h",
            desc: "test help"
          }
        },
        desc: "Test run server on port",
        args: ["port"],
        execs: {
          port({ port }) {
            console.log(`server running on port:${port}`);
          }
        }
      }
    }
  }
}).$use({
  CLI: {
    config: {
      name: "example",
      version: "0.0.1",
      start: true
    }
  }
});
