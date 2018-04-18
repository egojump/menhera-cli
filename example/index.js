const Menhera = require("menhera").default;
const CLI = require("../packages/core").default;

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    commands: {
      foo: {
        desc: "Test foo",
        args: ["foo"],
        execs: {
          _({ foo }) {}
        }
      },
      bar: {
        desc: "Test bar",
        args: ["bar"],
        execs: {
          _({ bar }) {}
        }
      }
    }
  }
}).$use({
  CLI: {
    config: {
      name: "example",
      version: "0.0.2",
      start: true
    }
  }
});
