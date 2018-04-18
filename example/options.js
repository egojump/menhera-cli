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
          "f,!b"({ foo }) {
            console.log(`just option foo: ${foo} `);
          },
          "!f,b"({ bar }) {
            console.log(`just option bar: ${bar} `);
          },
          "f,b"({ foo, bar }) {
            console.log(`both foo: ${foo} and bar: ${bar}`);
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
