export const inject = {
  options: {
    help({ tar }) {
      if (tar) {
        return tar;
      } else {
        return { alias: "h", desc: "help" };
      }
    }
  },
  execs: {
    help: ({ tar }) => data => {
      if (tar) {
        tar(data);
      } else {
        const { _key, _, $0 } = data;
        if (!$0) {
          _.$use({ CLI: { help: _key } });
        }
      }
    }
  }
};

export const Init = ({ config }) => ({
  CLI: {
    commands: {
      [config.rootAlias]: {
        options: {
          version: {
            alias: "v",
            desc: "version"
          }
        },
        execs: {
          v({ _, config: { version } }) {
            console.log(version);
          }
        }
      }
    }
  }
});
