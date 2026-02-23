import { Predmeti } from "./Predmeti.js";
import { Form } from "./Form.js";
import { StudentOcene } from "./StudentOcene.js";

const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

const leviDeo = document.createElement("div");
leviDeo.classList.add("levi-deo");
container.appendChild(leviDeo);

const predmetiDiv = document.createElement("div");
predmetiDiv.classList.add("predmeti");
leviDeo.appendChild(predmetiDiv);

const studentOceneDiv = document.createElement("div");
leviDeo.appendChild(studentOceneDiv);

const formaDiv = document.createElement("div");
formaDiv.classList.add("forma");
container.appendChild(formaDiv);

const configPredmeta = [
    { id: 1, naziv: "Web programiranje", boja: "red" },
    { id: 2, naziv: "Vestacka inteligencija", boja: "lightblue" },
    { id: 3, naziv: "Algoritmi i programiranje", boja: "brown" },
    { id: 4, naziv: "Operativni sistemi", boja: "pink" },
    { id: 5, naziv: "Uvod u racunarstvo", boja: "lightgreen" },
    { id: 6, naziv: "Paralelni sistemi", boja: "purple" },
    { id: 7, naziv: "Softversko inzenjerstvo", boja: "green" },
    { id: 8, naziv: "Distribuirani sistemi", boja: "orange" },
    { id: 9, naziv: "Strukture podataka", boja: "blue" },
    { id: 10, naziv: "Programski jezici", boja: "magenta" }
];

const prikazStudenata = new StudentOcene();
prikazStudenata.crtaj(studentOceneDiv);

async function osveziPrikaz() {
    const selektovani = predmetiComp.getSelektovani();

    const response = await fetch("http://localhost:5192/Ocene/PreuzmiOcene", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selektovani)
    });

    if (response.ok) {
        const podaci = await response.json();
        prikazStudenata.osvezi(podaci, configPredmeta);
    }
}

const predmetiComp = new Predmeti(configPredmeta, osveziPrikaz);
predmetiComp.crtaj(predmetiDiv);

const form = new Form(osveziPrikaz);
form.crtaj(formaDiv);

// inicijalno učitavanje (ako želiš da odmah prikaže podatke)
osveziPrikaz();