# Menehra-CLI

a cli plugin for menhera

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
      "*"({ test, h }) {
        test && console.log(test);
        h && console.log("Test help");
      },
      "serve [port]"({ port }) {
        console.log(`server running on port:${port}`);
      }
    },
    config: {
      version: "0.0.1"
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

### Default

```js
// $use init
{
  CLI: {
    options: {
      v: {
        alias: "version",
        desc: "version"
      },
      h: {
        alias: "help",
        decs: "help"
      }
    },
    commands: {
      "*"({ v, CLI: { config: { version } } }) {
        v && console.log(version);
      }
    }
  }
}
```
