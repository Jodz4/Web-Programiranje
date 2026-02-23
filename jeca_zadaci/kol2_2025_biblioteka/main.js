//fetch biblioteke
import { Red } from "./row.js";
const response = await fetch("http://localhost:5215/Biblioteka/PreuzmiBiblioteke");
if (!response.ok)
    console.log("ne radi ");
console.log("proslo");
const data = await response.json();
//pogledaj da li nije hteo da radi prethodni blanket
//zbog tvoje gluposti ili neceg drugog

//tatadiv je div koji sadrzi tri kartica
for (let l of data) {
    const divel = document.createElement("div");
    divel.classList.add("tataDiv");
    document.body.appendChild(divel);
    const r = new Red(divel, l);
    r.crtaj();
}
//ostalo je srednji box da se napravi 