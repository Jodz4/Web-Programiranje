import { App } from "./app.js";
const tatadiv = document.createElement("div");
tatadiv.classList.add("tatadiv");

const levi = document.createElement("div");
levi.classList.add("leviDiv");

const desni = document.createElement("div");
desni.classList.add("desniDiv");

tatadiv.appendChild(levi);
tatadiv.appendChild(desni);
document.body.appendChild(tatadiv);

const response = await fetch("https://localhost:7080/Chat/VratiSobe");
if (response.ok) {
    const sobe = await response.json();
    const a = new App(levi, desni, sobe);
    a.crtaj();
}
else {
    console.log("nece bre");
}