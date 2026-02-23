export class Kartice {
    constructor(cont) {
        this.predmeti = [];
        this.cekiraniPredmeti = [];
        this.studenti = [];
        this.container = cont;
    }
    async crtaj() {
        const pdiv = document.createElement("div");
        const kdiv = document.createElement("div");
        this.container.appendChild(pdiv);
        pdiv.classList.add("pdiv");
        kdiv.classList.add("kdiv");
        this.container.appendChild(kdiv);
        await this.preuzmiPredmete(pdiv);
        await this.preuzmiStudente();
        this.crtajKarticu(kdiv);
        const predmetiStavke = document.querySelectorAll(".checkbox-stakva");



    }

    async preuzmiOcene(nizIdjeva) {
        const response = await fetch("http://localhost:5192/Ocene/PreuzmiOcene", {
            method: "PUT", // Metoda mora biti PUT kao na slici
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nizIdjeva) // Šaljemo niz npr
        });

        if (!response.ok) {
            console.error("Greška pri preuzimanju ocena");
            return;
        }

        const podaci = await response.json();
        console.log("Preuzete ocene:", podaci);
        return podaci;
    }
    async preuzmiPredmete(divP) {
        const predmeti = await fetch("http://localhost:5192/Ocene/PreuzmiPredmete");
        if (!predmeti.ok) {
            console.log("Greska");
        }
        const data = await predmeti.json();

        for (const a of data) {
            this.predmeti.push(a);
        }
        this.predmeti.forEach(element => {

            let s = document.createElement("div");
            s.className = "checkbox-stavka";

            let ch = document.createElement("input");
            ch.type = "checkbox";
            ch.id = "cb-" + element.id;

            let lbl = document.createElement("label");
            lbl.textContent = element.naziv;
            lbl.htmlFor = "cb-" + element.id;

            s.appendChild(ch);
            s.appendChild(lbl);
            divP.appendChild(s);

            ch.onchange = async () => {
                if (ch.checked) {
                    this.cekiraniPredmeti.push(element.id);
                    const dk = document.body.querySelector(".kdiv");
                    this.brisiKartice(dk);
                    this.crtajKarticu(dk);

                    console.log("checked");
                }
                else {
                    this.cekiraniPredmeti = this.cekiraniPredmeti.filter(id => id !== element.id);
                    const dk = document.body.querySelector(".kdiv");
                    this.brisiKartice(dk);

                    await this.crtajKarticu(dk);

                    console.log("unckecked");

                }
            }
        });
    }
    brisiKartice(kdiv) {
        while (kdiv.firstChild)
            kdiv.removeChild(kdiv.firstChild);
    }
    //crta kartice za studente 
    async crtajKarticu(stdiv) {
        for (const student of this.studenti) {

            const ocn = await this.preuzmiOcene([student.id]);

            //ocene predmeta koje je strudetn polozio
            const relevantneOcene = ocn.filter(o => this.cekiraniPredmeti.includes(o.predmet.id));

            if (relevantneOcene.length > 0) {
                const pdiv = document.createElement("div");
                pdiv.classList.add("student");
                stdiv.appendChild(pdiv);

                const im = document.createElement("p");
                pdiv.appendChild(im);
                const pOcena = document.createElement("p");
                pOcena.textContent = student.imePrezime;
                pdiv.appendChild(pOcena);
                let index = 0;
                relevantneOcene.forEach(ocena => {
                    const ocdiv = document.createElement("div");
                    ocdiv.classList.add("ocdiv");
                    let vr = ocena.vrednost;
                    ocdiv.style.gridRowStart = 11 - vr;
                    ocdiv.style.gridRowEnd = 11;
                    ocdiv.style.gridColumnStart = (index + 1).toString();
                    console.log(ocdiv); ``
                    index += 1;
                    const predmet = this.predmeti.find(p => p.id == ocena.predmet.id);
                    pdiv.appendChild(ocdiv);
                });
            }
        }
    }
    async preuzmiStudente() {
        const studenti = await fetch("http://localhost:5192/Ocene/PreuzmiStudente");
        if (!studenti.ok) {
            console.log("Greska");
        }
        const data = await studenti.json();

        for (const a of data) {
            this.studenti.push(a);
        }
    }
}