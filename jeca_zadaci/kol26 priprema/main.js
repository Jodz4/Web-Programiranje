import { Pretraga } from "./pretraga.js";
import { Avion } from "./avion.js";
const p = new Pretraga;

const forma = document.createElement("div");
forma.classList.add("forma");
document.body.appendChild(forma);




const plane = document.createElement("div");
plane.classList.add("plane");
document.body.appendChild(plane);

await p.crtajPretragu(forma);