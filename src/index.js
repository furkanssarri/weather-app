// INDEX MODULE

import "./style.css";
import { render } from "./modules/render";
import { listenForm } from "./modules/logic";

function init() {
   render();
}

document.addEventListener("DOMContentLoaded", init);