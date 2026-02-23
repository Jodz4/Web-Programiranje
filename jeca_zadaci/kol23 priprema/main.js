import { Forma } from "./forma.js";
import { Kartice } from "./kartice.js";

const divLevi = document.createElement("div");
document.body.appendChild(divLevi);
let k = new Kartice(divLevi);
await k.crtaj();
const forma = document.createElement("div");
document.body.appendChild(forma);
let s = new Forma(forma);
forma.classList.add("forma");

await s.crtaj(); 