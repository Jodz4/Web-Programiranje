
export class Forma {
    constructor(cont, id, ime, indeks) {

        this.container = cont;
        this.predmeti = [];
    }
    async crtaj() {
        const indeks = this.crtajInput(this.container, "indeks", "indeks", "text");
        const ime = this.crtajInput(this.container, "Ime", "Ime i prezime: ", "text");
        const label = document.createElement("label");
        label.textContent = "Predmeti";
        this.container.appendChild(label);
        const predmeti = document.createElement("select");
        predmeti.name = "predmeti_select";
        this.container.appendChild(predmeti);
        const ocena = this.crtajInput(this.container, "ocena", "Ocena", "number");
        const dugmence = document.createElement("button");
        dugmence.textContent = "Upisi";
        dugmence.classList.add("gridColumn");
        this.container.appendChild(dugmence);


        await this.preuzmiPredmete(predmeti);


        dugmence.onclick = async () => {
            const response = await fetch("http://localhost:5192/Ocene/DodajOcenu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "brojIndeksa": indeks.value,
                    "imePrezime": ime.value,
                    "predmet": predmeti.value,
                    "ocena": ocena.value
                })
            });
        }
    }

    async preuzmiPredmete(select) {
        const predmeti = await fetch("http://localhost:5192/Ocene/PreuzmiPredmete");
        if (!predmeti.ok) {
            console.log("Greska");
        }
        const data = await predmeti.json();

        for (const a of data) {
            this.predmeti.push(a);
        }
        for (const l of this.predmeti) {
            const opt = document.createElement("option");
            opt.value = l.id;
            opt.textContent = l.naziv;
            select.appendChild(opt);
        }
    }
    crtajInput(cont, name, txt, type) {
        const label = document.createElement("label");
        label.textContent = txt;
        const inp = document.createElement("input");
        inp.type = type;
        inp.name = name;
        cont.appendChild(label);
        cont.appendChild(inp);
        return inp;
    }
}