const Menhera = require("menhera").default;
const CLI = require("../dist/core").default;

const _ = new Menhera({
  _mount: {
    CLI
  },
  CLI: {
    commands: {
      foo: {
        desc: "Test foo",
        options: {
          foo: {
            alias: "f",
            desc: "foo option"
          },
          bar: {
            alias: "b",
            desc: "bar option"
          }
        },
        execs: {
          _({ _, _key: usage, foo, bar }) {
            if (!foo || !bar) {
              _.$use({ CLI: { usage } });
            }
          }
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
