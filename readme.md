# Menehra-CLI

a cli plugin for menhera

## Use for CLI Tools

```bash
$ yarn global add menehra-cli
```

#### Install Template

```bash
$ mhr init uu-z/template-cli mycli
```

```bash
$ mhr init uu-z/template-module mymodule
```

## Use For Module

```bash
$ yarn add menhera menhera-cli
```

#### example

```js
// index.js
const Menhera = require("menhera").default;
const CLI = require("menhera-cli").default;

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
```

```bash
$ node index.js -h
```

![preview](./assets/cli.png)
