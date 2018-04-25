# Menehra-CLI

a cli plugin for menhera

## Use for CLI Tools

```bash
$ yarn global add menhera-cli
```

```bash
$ npm install menhera-cli -g
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
const mhr = require("menhera").default;
const CLI = require("menhera-cli");

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
```

```bash
$ node index.js
```

![preview](./assets/cli.png)
