import { Form } from "./Form.js";
import { Skladiste } from "./Skladiste.js";

const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

const skladisteDiv = document.createElement("div");
skladisteDiv.classList.add("skladisteDiv");
container.appendChild(skladisteDiv);

const formaDiv = document.createElement("div");
formaDiv.classList.add("formaDiv");
container.appendChild(formaDiv);

const form = new Form();
form.crtaj(formaDiv);

let listaSkladista = [];

// Moderno učitavanje sa servera
async function ucitajSkladista() {
    try {
        const res = await fetch("http://localhost:5231/Kolokvijum/PreuzmiSkladista");
        if (!res.ok) throw new Error("Greška pri preuzimanju podataka");
        
        const data = await res.json();
        data.forEach(s => {
            // Koristimo MaxKapacitet (veliko M) jer C# po defaultu tako šalje JSON
            const novoS = new Skladiste(s.id, s.maxKapacitet, s.elementi);
            novoS.crtaj(skladisteDiv);
            listaSkladista.push(novoS);
        });
    } catch (err) {
        console.error("Neuspešno učitavanje:", err);
    }
}

ucitajSkladista();

// Callback za formu
form.cbUpisi = async () => {
    const idSkladista = parseInt(form.polja["polje"].value);
    const velicina = parseInt(form.polja["velicina"].value);

    if (isNaN(idSkladista) || isNaN(velicina)) {
        alert("Unesite ispravne brojeve!");
        return;
    }

    const skladiste = listaSkladista.find(s => s.id === idSkladista);
    if (!skladiste) {
        alert("Skladiste ne postoji!");
        return;
    }

    const trenutnaSuma = skladiste.elementi.reduce((acc, el) => acc + (el.velicina || 0), 0);
    if (trenutnaSuma + velicina > skladiste.kapacitet) {
        alert("Nema dovoljno mesta!");
        return;
    }

    try {
        const res = await fetch(`http://localhost:5231/Kolokvijum/DodajElement/${idSkladista}/${velicina}`, { 
            method: 'POST' 
        });

        if (res.ok) {
            location.reload(); 
        } else {
            alert("Greska na serveru prilikom upisa!");
        }
    } catch (err) {
        console.error("Greška:", err);
    }
};