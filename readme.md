# Menehra-CLI

a cli plugin for menhera

### Use For Module

```bash
yarn add menhera menhera-cli
```

```js
// index.js
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
        exec({ _, $0, _key }) {
          if (!$0) {
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
node index.js -h
```

![preview](./assets/cli.png)
