const Menhera = require("menhera").default;
const CLI = require("../src").default;

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  },
  CLI: {
    prompts: {
      input: [
        {
          type: "text",
          name: "username",
          message: "What is your GitHub username?"
        },
        {
          type: "number",
          name: "age",
          message: "How old are you?"
        },
        {
          type: "select",
          name: "gender",
          message: "male or femal?",
          choices: [
            { title: "male", value: "male" },
            { title: "femal", value: "female" }
          ]
        }
      ],
      then({ res }) {
        console.log({ res });
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
