#!/usr/bin/env node

const cli = require("../dist").default;

cli.$use({
  CLI: {
    config: {
      start: true
    }
  }
});
