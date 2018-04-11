# Menehra-CLI

a cli plugin for menhera

### Use For Module

```bash
yarn add menhera menhera-cli
```

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
      "*"({ test, h }) {
        test && console.log(test);
        h && console.log("Test help");
      },
      "serve [port]"({ port }) {
        console.log(`server running on port:${port}`);
      }
    }
  }
}).$use({
  CLI: {
    config: {
      version: "0.0.1",
      start: true
    }
  }
});
```

```bash
node index.js serve 3000
```

### Use For Cli

```bash
yarn install menhera-cli -g

mhr init <my-project>
```
