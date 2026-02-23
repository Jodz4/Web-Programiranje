export class Korisnik {
    constructor() {
        this.polja = {};
        this.kontejner = null;
    }

    crtaj(host) {
        this.kontejner = document.createElement("div");
        this.kontejner.className = "korisnik-con";

        const naslov = document.createElement("h3");
        naslov.textContent = "Podaci o korisniku";
        this.kontejner.appendChild(naslov);

        this.polja["ime"] = this.dodajInput("Ime i prezime:", "text", this.kontejner);
        this.polja["jmbg"] = this.dodajInput("JMBG:", "text", this.kontejner);
        this.polja["brojVozacke"] = this.dodajInput("Broj vozačke dozvole:", "text", this.kontejner);
        this.polja["brDana"] = this.dodajInput("Broj dana:", "number", this.kontejner);

        host.appendChild(this.kontejner);
    }

    dodajInput(labelText, tip, host) {
        const red = document.createElement("div");
        red.className = "red";
        const label = document.createElement("label");
        label.textContent = labelText;
        red.appendChild(label);
        const input = document.createElement("input");
        input.type = tip;
        red.appendChild(input);
        host.appendChild(red);
        return input;
    }

    getPodatke() {
        return {
            ime: this.polja["ime"].value,
            jmbg: this.polja["jmbg"].value,
            brojVozacke: this.polja["brojVozacke"].value,
            brDana: parseInt(this.polja["brDana"].value)
        }
    }
}