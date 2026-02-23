import { Korisnik } from "./Korisnik.js";
import { Automobil } from "./Automobil.js";

export class RentACar {
    constructor() {
        this.korisnik = new Korisnik();
        this.desniPanel = null;
        this.filteriPolja = {};
        this.selectModel = null;
    }

    crtaj(host) {
        const glavni = document.createElement("div");
        glavni.className = "glavni-kontejner";
        host.appendChild(glavni);

        const levaStrana = document.createElement("div");
        levaStrana.className = "leva-strana";
        levaStrana.style.width = "500px";
        glavni.appendChild(levaStrana);

        this.korisnik.crtaj(levaStrana);
        this.crtajFiltere(levaStrana);

        this.desniPanel = document.createElement("div");
        this.desniPanel.className = "desni-panel";
        glavni.appendChild(this.desniPanel);

        this.ucitajSveAutomobile();
    }

    crtajFiltere(host) {
        const div = document.createElement("div");
        div.className = "sekcija-filteri";
        div.innerHTML = "<h3>Filtriranje prikaza</h3>";
        
        this.filteriPolja["km"] = this.korisnik.dodajInput("Pređena km:", "number", div);
        this.filteriPolja["sedista"] = this.korisnik.dodajInput("Broj sedišta:", "number", div);
        this.filteriPolja["cena"] = this.korisnik.dodajInput("Cena do:", "number", div);
        
        this.selectModel = document.createElement("select");
        div.appendChild(this.selectModel);

        const btnFilter = document.createElement("button");
        btnFilter.textContent = "Filtriraj prikaz";
        btnFilter.onclick = () => this.filtriraj();
        div.appendChild(btnFilter);

        host.appendChild(div);
    }

    async ucitajSveAutomobile() {
        const resp = await fetch("http://localhost:5231/RentACar/VratiSve");
        const podaci = await resp.json();
        
        // Dinamičko popunjavanje modela (samo prvi put ili pri svakom load-u)
        this.popuniModele(podaci);
        this.osveziPrikaz(podaci);
    }

    popuniModele(podaci) {
        const trenutnaVrednost = this.selectModel.value;
        this.selectModel.innerHTML = "";
        const opcijaSvi = document.createElement("option");
        opcijaSvi.textContent = "Svi";
        opcijaSvi.value = "Svi";
        this.selectModel.appendChild(opcijaSvi);

        const modeli = [...new Set(podaci.map(a => a.model))];
        modeli.forEach(m => {
            const opt = document.createElement("option");
            opt.value = m;
            opt.textContent = m;
            this.selectModel.appendChild(opt);
        });
        if(trenutnaVrednost) this.selectModel.value = trenutnaVrednost;
    }

    osveziPrikaz(podaci) {
        this.desniPanel.innerHTML = "";
        podaci.forEach(autoPodaci => {
            const auto = new Automobil(autoPodaci, this.korisnik, this);
            auto.crtaj(this.desniPanel);
        });
    }

    async filtriraj() {
        const km = this.filteriPolja["km"].value;
        const sedista = this.filteriPolja["sedista"].value;
        const cena = this.filteriPolja["cena"].value;
        const model = this.selectModel.value;

        const url = `http://localhost:5231/RentACar/Filtriraj?km=${km}&sedista=${sedista}&cena=${cena}&model=${model}`;
        const resp = await fetch(url);
        const podaci = await resp.json();

        this.osveziPrikaz(podaci);
    }
}