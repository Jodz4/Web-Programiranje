import { Forma } from "./forma.js";

const forma = document.createElement("div");
const prikaz = document.createElement("div");
const ceodiv = document.createElement("div");
const hd = document.createElement("h1");
hd.textContent = "Lekovito bilje";
document.body.appendChild(hd);
ceodiv.appendChild(forma);
ceodiv.appendChild(prikaz);
ceodiv.classList.add("ceodiv");
forma.classList.add("forma");
prikaz.classList.add("prikaz");
document.body.appendChild(ceodiv);
//jedino ne selektuje po osobinama jer na kapiram strukturu blanekta iskreno
//niti dodaje nepostojecu biljku a to me samo mrzelo da napravim jer mora da se prodje kroz
//sve osobine i da se to posalje kao parametar metodi 
//ne kapiram koncept blanketa iskreno

const f = new Forma(forma, prikaz);
f.crtaj(); 