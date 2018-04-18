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
```

```bash
node index.js -h
```

![preview](./assets/cli.png)
