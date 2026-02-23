import { Racuni } from "./racuni.js";
export class App {
    constructor(cont, stanovi) {
        this.container = cont;
        this.stanoviIDS = stanovi;

    }
    crtaj() {
        console.log(this.container);
        const ceoLeviDeo = this.crtajElement("div", this.container, "ceoLeviDeo");
        console.log(ceoLeviDeo);
        this.crtajLeviDeo(ceoLeviDeo);
        this.container.appendChild(ceoLeviDeo);


    }
    crtajElement(tip, kont, klasa, txt) {
        const el = document.createElement(tip);
        if (klasa != "")
            el.classList.add(klasa);
        el.textContent = txt;
        kont.appendChild(el);
        return el;
    }
    napuniOpcijama(select) {
        for (let l of this.stanoviIDS) {
            const opt = this.crtajElement("option", select, "", l);
            opt.value = l;
        }
    }
    crtajLeviDeo(divzadeo) {
        const desni = this.crtajElement("div", this.container, "desniDiv", "", "");

        const selectDiv = this.crtajElement("div", divzadeo, "selectDiv");
        const lbl = this.crtajElement("label", selectDiv, "sd12", "Biraj stan");
        const selectD = this.crtajElement("select", selectDiv, "sd23", "selectStanovi");
        selectD.name = "selectD";

        this.napuniOpcijama(selectD);

        selectD.onchange = () => {
            console.log("changed");
        }
        const btn = this.crtajElement("button", selectDiv, "dugmenceSelect", "Prikaz informacija");
        btn.onclick = async () => {
            console.log("kliknuo");
            const el = document.querySelector(".selectDiv2");
            if (el != null)
                divzadeo.removeChild(el);
            await this.preuzmiInfo(divzadeo, selectD.value, desni);
        }



    }
    async preuzmiInfo(divzadeo, id, desniDiv) {
        const selectDiv2 = this.crtajElement("div", divzadeo, "selectDiv2");

        const response = await fetch(`https://localhost:7080/Stan/VratiStan/${id}`);
        if (!response.ok) {
            console.log("nece bre");
        }

        const info = await response.json();
        const lbl1 = this.crtajElement("label", selectDiv2, "sd12", "Broj stan");
        const broj = this.crtajElement("label", selectDiv2, "sd23", info.stan.id);

        const lbl2 = this.crtajElement("label", selectDiv2, "sd12", "Ime vlasnika");
        const ime = this.crtajElement("label", selectDiv2, "sd23", info.stan.vlasnik);

        const lbl3 = this.crtajElement("label", selectDiv2, "sd12", "Povrsina (m2)");
        const pov = this.crtajElement("label", selectDiv2, "sd23", info.stan.povrsina);

        const lbl4 = this.crtajElement("label", selectDiv2, "sd12", "Broj clanova");
        const clanovi = this.crtajElement("label", selectDiv2, "sd23", info.stan.brojClanova);

        const btn = this.crtajElement("button", selectDiv2, "dugmenceSelect", "Izracunaj ukupno zaduzenje");
        btn.onclick = async () => {
            this.izbrisiSve(desniDiv)
            this.crtajRacune(desniDiv, info.racuni);
            await this.racunajZaduzenje(id, selectDiv2);
        }
    }
    async racunajZaduzenje(IDStana, dodatiOvde) {
        const response = await fetch(`https://localhost:7080/Stan/IzracunajUkupnoZaduzenje/${IDStana}`);
        if (!response.ok) {
            console.log("ne valja");
        }
        const data = await response.text();
        const lbl4 = this.crtajElement("label", dodatiOvde, "", data);
        console.log(data);
    }
    crtajRacune(d, racuni) {

        for (let l of racuni) {
            const r = new Racuni(d, l);
            r.crtaj();
        }

    }
    izbrisiSve(kont) {
        while (kont.firstChild)
            kont.removeChild(kont.firstChild);
    }
}