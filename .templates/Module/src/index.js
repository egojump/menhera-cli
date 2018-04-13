import Menhera from "menhera";

const _ = new Menhera({
  _hooks: {
    say({ _val }) {
      console.log(_val);
    }
  },
  say: "Hello World"
});
