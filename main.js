import {OrchestraGrid} from '/custom_orchestra.js'

const hyper = window.hyperHTML;
const app = document.querySelector(".app");

customElements.define("orchestra-grid", OrchestraGrid);

window.onload = () => {
  hyper(app)`
    <orchestra-grid></orchestra-grid>
  `
}
