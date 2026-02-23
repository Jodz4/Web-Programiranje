export class Racuni {
    constructor(cont, racun) {
        this.racun = racun;
        this.container = cont;
    }
    crtaj() {

        const kartica = this.crtajElement("div", this.container, "kartica", "");
        const karticazaGrid = this.crtajElement("div", kartica, "karticaZaGrid", "");

        const lbl1 = this.crtajElement("label", karticazaGrid, "sd12", "Mesec");
        const broj = this.crtajElement("label", karticazaGrid, "sd23", this.racun.mesec);

        const lbl2 = this.crtajElement("label", karticazaGrid, "sd12", "Cena vode: ");
        const ime = this.crtajElement("label", karticazaGrid, "sd23", this.racun.cenaVode);

        const lbl3 = this.crtajElement("label", karticazaGrid, "sd12", "Struja");
        const pov = this.crtajElement("label", karticazaGrid, "sd23", this.racun.cenaZajednickeStruje);

        const lbl33 = this.crtajElement("label", karticazaGrid, "sd12", "Komunalije");
        const kom = this.crtajElement("label", karticazaGrid, "sd23", this.racun.cenaKomunalija);

        const lbl4 = this.crtajElement("label", karticazaGrid, "sd12", "Placen");
        const clanovi = this.crtajElement("label", karticazaGrid, "sd23", this.racun.placen);
        if (this.racun.placen == "Da") {
            kartica.classList.add("redK");
        }
        else
            kartica.classList.add("greenK");

    }
    crtajElement(tip, kont, klasa, txt) {
        const el = document.createElement(tip);
        if (klasa != "")
            el.classList.add(klasa);
        el.textContent = txt;
        kont.appendChild(el);
        return el;
    }
}