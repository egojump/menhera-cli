export const space = num => Array.from(new Array(num)).join(" ");

export const fillSpace = (size, current) => space(size - current);

export const genOutput = ({ input, chalkFn, length, left = 0, right = 0 }) => {
  let inputLenght = input.length;
  let output = chalkFn(input);
  (!length || inputLenght > length) && (length = inputLenght);

  return `${space(left)}${output || []}${fillSpace(length, inputLenght)}${space(
    right
  )}`;
};

export const ENV = ({ _args, args, options }) => {
  let env = {};
  env.NONE_ARGS = args.length === 0;
  env.NONE_OPTIONS = Object.keys(options).length === 0;
  env.NONE_INPUTS = env.NONE_ARGS && env.NONE_OPTIONS;
  env.NONE_FULL_ARGS = _args.length !== args.length;
  return env;
};
