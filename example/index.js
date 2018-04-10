const Menhera = require("menhera").default;
const CLI = require("../dist").default;

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    options: {
      t: {
        alias: "test",
        desc: "test desc"
      }
    },
    commands: {
      "*"({ test }) {
        test && console.log(test);
      },
      "serve [port]"({ port }) {
        console.log(`server running on port:${port}`);
      }
    },
    config: {
      version: "0.0.1",
      help: ({ config: { version } }) => `${version}`
    }
  }
}).$use({
  CLI: {
    config: {
      start: true
    }
  }
});