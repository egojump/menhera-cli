export const ENV = (ctx, next) => {
  const { _args, args, options } = ctx;
  let env = {};
  env.NONE_ARGS = args.length === 0;
  env.NONE_OPTIONS = Object.keys(options).length === 0;
  env.NONE_INPUTS = env.NONE_ARGS && env.NONE_OPTIONS;
  env.NONE_FULL_ARGS = _args.length !== args.length;
  ctx.env = env;
  next();
};

export const HV = (ctx, next) => {
  const { _, help, _key, v, config } = ctx;
  const {
    package: { version }
  } = config;
  if (help) {
    _.$use({ [`CLI.help`]: _key });
    return;
  }
  if (v) {
    console.log(version);
    return;
  }
  next();
};
