export const basic = {
  desc: "*",
  exec({ _, h, CLI: { commands } }) {
    _.$use({
      CLI: {
        call: {
          help: true
        }
      }
    });
  }
};

export const serve = {
  desc: "run serve on port",
  args:['port'],
  exec({ port }) {
    console.log(`server running on port:${port}`);
  }
};
