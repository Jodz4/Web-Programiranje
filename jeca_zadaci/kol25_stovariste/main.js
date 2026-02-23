import { Red } from "./red.js";
const response = await fetch(`http://localhost:5043/Stovariste/PreuzmiStovarista`);
if (!response.ok) {
    console.log("Bad");
}
const data = await response.json();

for (let l of data) {
    //pravi red
    const dv = document.createElement("div");
    dv.classList.add("tatadiv");
    const naziv = document.createElement("h2");
    naziv.textContent = l.naziv + " " + l.adresa;
    document.body.appendChild(dv);

    dv.appendChild(naziv);
    const red = document.createElement("div");
    dv.appendChild(red);
    red.classList.add("jedanRedDiv");


    const r = new Red(red, l);
    r.crtaj();

}