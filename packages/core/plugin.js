import prompts from "prompts";

export const _prompts = {
  _({ _, _val }) {
    const { input, then } = _val;
    prompts(input).then(res => then({ res, _, CLI: this }));
  }
};
