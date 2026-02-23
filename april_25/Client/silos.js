export class Silos {
    constructor(id, oznaka, kapacitet, trenutnaKolicina) {
        this.id = id;
        this.oznaka = oznaka;
        this.kapacitet = kapacitet;
        this.trenutnaKolicina = trenutnaKolicina;
        
        this.container = null;
        this.nivoDiva = null;
        this.labelaDiva = null;
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.className = "silos-kontejner";

        // Labela: Silos 1: 100t / 2000t
        this.labelaDiva = document.createElement("div");
        this.labelaDiva.className = "silos-naslov";
        this.azurirajTekst();
        this.container.appendChild(this.labelaDiva);

        // Okvir silosa
        const staklo = document.createElement("div");
        staklo.className = "silos-staklo";

        // Materijal unutra
        this.nivoDiva = document.createElement("div");
        this.nivoDiva.className = "silos-materijal";
        this.postaviNivo();

        staklo.appendChild(this.nivoDiva);
        this.container.appendChild(staklo);
        host.appendChild(this.container);
    }

    azurirajTekst() {
        this.labelaDiva.textContent = `${this.oznaka}: ${this.trenutnaKolicina}t / ${this.kapacitet}t`;
    }

    postaviNivo() {
        const procenat = (this.trenutnaKolicina / this.kapacitet) * 100;
        this.nivoDiva.style.height = `${procenat}%`;
    }

    dodajMaterijal(kolicina) {
        this.trenutnaKolicina += kolicina;
        this.azurirajTekst();
        this.postaviNivo();
    }
}