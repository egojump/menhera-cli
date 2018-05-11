import path from "path";
import fs from "fs-extra";

export const space = num => Array.from(new Array(num)).join(" ");

export const fillSpace = (size, current) => space(size - current);

export const genOutput = ({ input, chalkFn, length, left = 0, right = 0 }) => {
  let inputLenght = input.length;
  let output = chalkFn(input);
  (!length || inputLenght > length) && (length = inputLenght);

  return `${space(left)}${output || []}${fillSpace(length, inputLenght)}${space(right)}`;
};
