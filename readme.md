# Menehra-CLI

a cli plugin for menhera

### Use For CLI

```bash
yarn global add menhera-cli

mhr init <my-project>
```

### Use For Module

```bash
yarn add menhera menhera-cli
```

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
      foo: {
        desc: "Test foo",
        args: ["foo", "foo1"],
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
```

```bash
node index.js -h
```

![preview](./assets/cli.png)
