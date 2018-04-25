const mhr = require("menhera").default;
const CLI = require("../dist");

mhr.$use({
  _mount: {
    CLI
  },
  CLI: {
    commands: {
      _: {
        options: {
          test: { alias: "t", desc: "test", default: null }
        },
        exec({ _, _key, env }) {
          if (env.NONE_INPUTS) {
            _.$use({ CLI: { help: _key } });
          }
        }
      },
      foo: {
        desc: "Test foo",
        args: ["foo", "foo1"],
        exec({ foo }) {}
      },
      bar: {
        desc: "Test bar",
        args: ["bar"],
        exec({ bar }) {}
      }
    },
    config: {
      name: "example",
      version: "0.0.2",
      start: true
    }
  }
});
