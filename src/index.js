import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (includes Popper.js)

import { render } from "./modules/render";
import { listenForm } from "./modules/logic";

function init() {
   render();
}

document.addEventListener("DOMContentLoaded", init);