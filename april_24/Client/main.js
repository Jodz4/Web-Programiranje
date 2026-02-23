import { Projekcija } from "./projekcija.js";

document.addEventListener("DOMContentLoaded", async () => {
    const root = document.body;

    try {
        // Povlačimo samo listu filmova (bez sedišta - uslov ispoštovan)
        const response = await fetch("http://localhost:5089/api/Bioskop/PreuzmiProjekcije");
        const filmovi = await response.json();

        filmovi.forEach(f => {
            const p = new Projekcija(f.sifra, f.naziv, f.vreme, f.sala, f.osnovnaCena);
            p.crtaj(root);
        });
    } catch (error) {
        console.error("Greska pri inicijalnom ucitavanju:", error);
    }
});