# Menehra-CLI

### Install

```bash
yarn add menhera menhera-cli
```

### example

```js
// index.js

const Menehra = require("menehra");
const CLI = require("menhera-cli");

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    options: {
      t: {
        alias: "test",
        desc: "test desc"
      }
    },
    commands: {
      "*"({ test }) {
        test && console.log(test);
      },
      "serve [port]"({ port }) {
        console.log(`server running on port:${port}`);
      }
    },
    config: {
      version: "0.0.1",
      helpMessage: "test help",
      help: ({ config: { version, helpMessage } }) =>
        `${helpMessage} in version: ${version}`
    }
  }
}).$use({
  CLI: {
    config: {
      start: true
    }
  }
});
```

```bash
node index.js serve 3000
```
