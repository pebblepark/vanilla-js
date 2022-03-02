import { Component } from "./core/Component.js";
import { setA, setB, store } from "./reduxStore.js";

const InputA = () =>
  `<input id="stateA" value="${store.getState().a}" size="5" />`;
const InputB = () =>
  `<input id="stateB" value="${store.getState().b}" size="5" />`;
const Calculator = () =>
  `<p>a + b = ${store.getState().a + store.getState().b}</p>`;

export class App extends Component {
  template() {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent() {
    const { $el } = this;

    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      store.dispatch(setA(Number(target.value)));
    });

    $el.querySelector("#stateB").addEventListener("change", ({ target }) => {
      store.dispatch(setB(Number(target.value)));
    });
  }
}
