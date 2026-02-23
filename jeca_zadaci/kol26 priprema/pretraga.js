import { Avion } from "./avion.js";
export class Pretraga {
    constructor() {
        this.aerodromi = [];
        const planeCont = document.querySelector(".plane");
        this.avion = new Avion(planeCont);
    }

    async crtajPretragu(container) {
        try {

            await this.preuzmiAerodrome();
            const from = this.crtajSelect("Od", this.aerodromi, container);
            const to = this.crtajSelect("Do", this.aerodromi, container);
            const letSelect = this.crtajSelect("Let", this.aerodromi, container);


            this.crtajInputPolje("Ime", "text", "ime", container);
            this.crtajInputPolje("Prezime", "text", "prezime", container);
            this.crtajInputPolje("Gate", "text", "gate", container);
            this.crtajInputPolje("Sediste", "text", "sediste", container);
            this.crtajInputPolje("Datum", "date", "datum", container);
            this.crtajInputPolje("Vreme", "time", "vreme", container);
            this.crtajButton("KUPI", container);

            to.onchange = async () => {
                await this.aerodromPromenjen(letSelect, from, to);
            }
            from.onchange = async () => {
                await this.aerodromPromenjen(letSelect, from, to);
            }
            letSelect.onchange = async () => {
                await this.avion.crtajAvion(letSelect.value);
            };
        } catch (err) {
            console.error("Greška pri učitavanju:", err);
        }
    }
    isprazniSelect(sel) {
        while (sel.firstChild)
            sel.removeChild(sel.firstChild);
    }
    async aerodromPromenjen(letSelect, from, to) {
        this.isprazniSelect(letSelect);

        const response = await fetch(`https://localhost:7262/Airport/GetFlights/${from.value}/${to.value}`);

        if (response.ok) {
            const data = await response.json();

            for (const l of data) {
                const letOption = document.createElement("option");
                letOption.value = l.flight;
                letOption.textContent = l.flight;
                letSelect.appendChild(letOption);
            }

            await this.avion.crtajAvion(letSelect.value);
        }
    }
    crtajSelect(labelaText, opcije, cont) {
        const label = document.createElement("label");
        label.textContent = labelaText;
        const select = document.createElement("select");
        for (const a of this.aerodromi) {
            const fromOption = document.createElement("option");
            fromOption.value = a.code;
            fromOption.textContent = `${a.airport} (${a.code})`;
            select.appendChild(fromOption);
        }
        cont.appendChild(label);
        cont.appendChild(select);
        return select;
    }
    async preuzmiAerodrome() {
        try {
            const response = await fetch("https://localhost:7262/Airport/GetAirports");

            if (!response.ok) {
                const error = await response.text();
                console.error(error);
            }

            const aer = await response.json();

            for (const a of aer) {
                this.aerodromi.push(a);
            }
        }
        catch (e) {
            console.error(`Fetch failed: ${e}`);
        }
    }
    crtajButton(txt, cont) {
        const btn = document.createElement("button");
        btn.textContent = txt;
        cont.appendChild(btn);
        btn.classList.add("kupiBtn");
    }
    crtajInputPolje(labelaText, tip, name, cont) {
        const label = document.createElement("label");
        label.textContent = labelaText;

        const input = document.createElement("input");
        input.type = tip;
        input.name = name;

        cont.appendChild(label);
        cont.appendChild(input);
    }
}