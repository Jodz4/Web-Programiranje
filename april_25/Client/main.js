import { Fabrika } from "./fabrika.js";

async function ucitajAplikaciju() {
    try {
        const resp = await fetch("http://localhost:5079/Fabrika/VratiSve");
        
        if (resp.ok) {
            const podaci = await resp.json();
            podaci.forEach(f => {
                const fab = new Fabrika(f.id, f.naziv, f.silosi);
                fab.crtaj(document.body);
            });
        } else {
            console.error("Serverska greška:", resp.status);
            alert("Server je vratio grešku pri učitavanju.");
        }
    } catch (error) {
        console.error("Greška u povezivanju:", error);
        alert("Neuspelo povezivanje sa serverom. Proveri da li je server pokrenut na portu 5079.");
    }
}

ucitajAplikaciju();