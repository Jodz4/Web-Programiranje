import { App } from "./app.js";

const response = await fetch("https://localhost:7080/Stan/VratiIDeveSvihStanova");
if (!response.ok) {
    console.log("ne valja");
}
const data = await response.json();
const dv = document.createElement("tatadiv");
document.body.appendChild(dv);
const a = new App(dv, data);
a.crtaj();

//napravi desni div da radi 