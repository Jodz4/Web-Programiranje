import { Sediste } from "./sediste.js";

export class Projekcija {
    constructor(sifra, naziv, vreme, sala, osnovnaCena) {
        this.sifra = sifra;
        this.naziv = naziv;
        this.vreme = vreme;
        this.sala = sala;
        this.osnovnaCena = osnovnaCena;
        this.sedista = [];
        this.odabranoSediste = null;

        // Referenca na kontejner u kom će se crtati sedišta
        this.salaKontejner = null;
        this.inputRed = null;
        this.inputBroj = null;
        this.inputCena = null;
        this.inputSifra = null;
    }

    dodajSediste(red, broj, status) {
        this.sedista.push(new Sediste(red, broj, status, this));
    }

    selektujSediste(sediste) {
        if (this.odabranoSediste) this.odabranoSediste.container.classList.remove("selektovano");
        this.odabranoSediste = sediste;
        sediste.container.classList.add("selektovano");

        this.inputRed.value = sediste.red;
        this.inputBroj.value = sediste.broj;
        this.inputCena.value = (this.osnovnaCena * Math.pow(0.97, sediste.red - 1)).toFixed(0);
        this.inputSifra.value = this.sifra;
    }

    crtaj(host) {
        const glavniDiv = document.createElement("div");
        glavniDiv.style.marginBottom = "30px";

        const naslov = document.createElement("h2");
        naslov.innerText = `${this.naziv}: ${this.vreme} - Sala ${this.sala}`;
        glavniDiv.appendChild(naslov);

        const kontejner = document.createElement("div");
        kontejner.className = "projekcija-kontejner";
        glavniDiv.appendChild(kontejner);

        this.crtajFormu(kontejner);

        // Ovde pravimo prazan kontejner za salu koji ćemo popuniti na klik
        this.salaKontejner = document.createElement("div");
        this.salaKontejner.className = "sala-sekcija";
        
        // Dugme za učitavanje sedišta (Ispoštovan uslov da se ne vuče sve odmah)
        const btnUcitaj = document.createElement("button");
        btnUcitaj.innerText = "Prikaži salu / Osveži";
        btnUcitaj.onclick = () => this.ucitajSalu();
        this.salaKontejner.appendChild(btnUcitaj);

        kontejner.appendChild(this.salaKontejner);
        host.appendChild(glavniDiv);
    }

    async ucitajSalu() {
        try {
            const res = await fetch(`http://localhost:5089/api/Bioskop/PreuzmiSedista/${this.sifra}`);
            const podaci = await res.json();

            // Brišemo staro stanje iz JS-a i sa ekrana
            this.sedista = [];
            // Brišemo sve osim prvog elementa (dugmeta)
            while (this.salaKontejner.childNodes.length > 1) {
                this.salaKontejner.removeChild(this.salaKontejner.lastChild);
            }

            podaci.forEach(s => this.dodajSediste(s.red, s.broj, s.status));

            // Grupisanje i iscrtavanje
            const brojRedova = Math.max(...this.sedista.map(s => s.red));
            for (let r = 1; r <= brojRedova; r++) {
                const redDiv = document.createElement("div");
                redDiv.className = "red-sedista";
                this.sedista.filter(s => s.red === r).forEach(s => s.crtaj(redDiv));
                this.salaKontejner.appendChild(redDiv);
            }
        } catch (e) { console.error("Greska pri ucitavanju sedista", e); }
    }

    crtajFormu(host) {
        const sekcija = document.createElement("div");
        sekcija.className = "kupovina-sekcija";

        ["Red:", "Broj sedišta:", "Cena karte:", "Šifra:"].forEach((labela, index) => {
            const div = document.createElement("div");
            div.className = "input-grupa";
            const l = document.createElement("label");
            l.innerText = labela;
            const i = document.createElement("input");
            i.type = "text";
            i.readOnly = true;
            div.appendChild(l);
            div.appendChild(i);
            sekcija.appendChild(div);
            
            if (index === 0) this.inputRed = i;
            if (index === 1) this.inputBroj = i;
            if (index === 2) this.inputCena = i;
            if (index === 3) this.inputSifra = i;
        });

        const btn = document.createElement("button");
        btn.innerText = "Kupi kartu";
        btn.onclick = () => this.izvrsiKupovinu();
        sekcija.appendChild(btn);
        host.appendChild(sekcija);
    }

    async izvrsiKupovinu() {
        if (!this.odabranoSediste) return;
        const res = await fetch(`http://localhost:5089/api/Bioskop/KupiKartu/${this.sifra}/${this.odabranoSediste.red}/${this.odabranoSediste.broj}`, {
            method: 'POST'
        });

        if (res.ok) {
            this.odabranoSediste.postaviZauzeto();
            this.odabranoSediste = null;
            [this.inputRed, this.inputBroj, this.inputCena, this.inputSifra].forEach(i => i.value = "");
        }
    }
}