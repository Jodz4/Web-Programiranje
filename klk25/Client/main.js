// main.js
import { Biblioteka } from "./Biblioteka.js";

async function ucitajSveBiblioteke() {
    try {
        const resp = await fetch("http://localhost:5215/Biblioteka/PreuzmiBiblioteke");
        const biblioteke = await resp.json();

        console.log("Podaci sa servera:", biblioteke); 

        biblioteke.forEach(b => {
            
           const bib = new Biblioteka(
            b.id,
            b.imeBiblioteke,  
            b.adresa,
            b.email
        );
            bib.crtaj(document.body);
            bib.prikaziNajcitaniju();
        });
    } catch (err) {
        console.error("Greška pri učitavanju:", err);
    }
}

ucitajSveBiblioteke();