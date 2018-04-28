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
        examples: {
          foo: "foo 123"
        },
        exec({ foo }) {
          console.log(foo);
        }
      },
      bar: {
        desc: "Test bar",
        args: ["bar"],
        examples: {
          bar: "bar 456"
        },
        exec({ bar }) {
          console.log(bar);
        }
      }
    },
    config: {
      name: "example",
      version: "0.0.2",
      start: true
    }
  }
});
