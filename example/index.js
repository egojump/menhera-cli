const Menhera = require("menhera").default;
const CLI = require("../dist/core").default;

const _ = new Menhera({
  _mount: {
    CLI
  },
  CLI: {
    commands: {
      _: {
        options: {
          test: {
            alias: "t",
            desc: "test"
          }
        },
        exec({ _, $0, _key, options }) {
          if (!$0 && Object.keys(options).length === 0) {
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
