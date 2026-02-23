import { Silos } from "./silos.js";

export class Fabrika {
    constructor(id, naziv, silosiPodaci) {
        this.id = id;
        this.naziv = naziv;
        this.silosi = [];
        this.selectSilos = null;
        this.inputKolicina = null;

        silosiPodaci.forEach(s => {
            this.silosi.push(new Silos(s.id, s.oznaka, s.kapacitet, s.trenutnaKolicina));
        });
    }

    crtaj(host) {
        const glavniOkvir = document.createElement("div");
        glavniOkvir.className = "glavni-okvir";
        host.appendChild(glavniOkvir);

        const zaglavlje = document.createElement("div");
        zaglavlje.className = "zaglavlje";
        glavniOkvir.appendChild(zaglavlje);

        const h1 = document.createElement("h1");
        h1.textContent = this.naziv;
        zaglavlje.appendChild(h1);

        const kontrolePanel = document.createElement("div");
        kontrolePanel.className = "kontrole";
        glavniOkvir.appendChild(kontrolePanel);

        this.nacrtajKontrole(kontrolePanel);

        const desniPanel = document.createElement("div");
        desniPanel.className = "prikaz-silosa";
        glavniOkvir.appendChild(desniPanel);

        this.silosi.forEach(s => s.crtaj(desniPanel));
    }

    nacrtajKontrole(host) {
        const red1 = document.createElement("div");
        red1.className = "red";
        const l1 = document.createElement("label");
        l1.textContent = "Silos:";
        this.selectSilos = document.createElement("select");
        
        this.silosi.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s.id;
            opt.textContent = s.oznaka;
            this.selectSilos.appendChild(opt);
        });

        red1.appendChild(l1);
        red1.appendChild(this.selectSilos);
        host.appendChild(red1);

        const red2 = document.createElement("div");
        red2.className = "red";
        const l2 = document.createElement("label");
        l2.textContent = "Količina:";
        this.inputKolicina = document.createElement("input");
        this.inputKolicina.type = "number";
        this.inputKolicina.value = 0;

        red2.appendChild(l2);
        red2.appendChild(this.inputKolicina);
        host.appendChild(red2);

        const btnSipaj = document.createElement("button");
        btnSipaj.textContent = "Sipaj u silos";
        btnSipaj.onclick = () => this.sipajUMaterijal();
        host.appendChild(btnSipaj);
    }

    async sipajUMaterijal() {
        const kolicina = parseInt(this.inputKolicina.value);
        const sId = parseInt(this.selectSilos.value);

        if (isNaN(kolicina) || kolicina <= 0) {
            alert("Unesite ispravnu količinu!");
            return;
        }

        const silos = this.silosi.find(s => s.id === sId);

        if (silos.trenutnaKolicina + kolicina > silos.kapacitet) {
            alert("Greška: Prekoračen kapacitet silosa!");
            return;
        }

        try {
            const resp = await fetch(`http://localhost:5079/Fabrika/Sipaj/${sId}/${kolicina}`, {
                method: "PUT"
            });

            if (resp.ok) {
                silos.dodajMaterijal(kolicina);
            } else {
                const poruka = await resp.text();
                alert("Greška sa servera: " + poruka);
            }
        } catch (err) {
            alert("Greška u komunikaciji sa serverom.");
        }
    }
}