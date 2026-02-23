export class Red {
    constructor(cont, stovariste) {
        this.container = cont;
        this.stovariste = stovariste;
    }
    async crtaj() {

        const levi = this.crtajLevi();
        this.container.appendChild(levi);
        const srednji = this.crtajSrednji();
        this.container.appendChild(srednji);
        const desni = await this.crtajDesni();
        this.container.appendChild(desni);


    }
    crtajLevi() {

        const leviDiv = document.createElement("div");
        leviDiv.classList.add("levi");
        leviDiv.classList.add("kartica");

        const naslov = document.createElement("h3");
        naslov.textContent = "Dodavanje materijala";
        leviDiv.appendChild(naslov);

        const divZaInput = document.createElement("div");
        leviDiv.appendChild(divZaInput);
        divZaInput.classList.add("inputDivLevi");

        const naziv = this.crtajInput("text", divZaInput, "naziv", "Naziv: ", "inputLevi");
        const datum = this.crtajInput("date", divZaInput, "datum", "Datum: ", "inputLevi");
        const kolicina = this.crtajInput("text", divZaInput, "kolicina", "Kolicina: ", "inputLevi");
        const cena = this.crtajInput("text", divZaInput, "cena", "Cena: ", "inputLevi");

        /*divZaInput.appendChild(naziv);
        divZaInput.appendChild(datum);
        divZaInput.appendChild(kolicina);
        divZaInput.appendChild(cena);*/


        const btn = document.createElement("button");
        btn.textContent = "Dodaj";
        divZaInput.appendChild(btn);
        btn.classList.add("btn2row");
        btn.onclick = async () => {
            this.dodajMaterijal(naziv.value, datum.value, kolicina.value, cena.value);
            this.obrisi(naziv, datum, kolicina, cena);
        }

        leviDiv.appendChild(divZaInput);
        return leviDiv;

    }
    obrisi(f, s, t, fd) {
        f.value = "";
        s.value = "";
        t.value = "";
        fd.value = "";
    }
    async dodajMaterijal(naziv, datum, kolicina, cena) {
        const materijal = {
            Naziv: naziv,
            Datum: datum

        };

        let response = await fetch(`http://localhost:5043/Stovariste/DodavanjeMaterijala/${this.stovariste.id}/${kolicina}/${cena}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(materijal)
        });

        if (!response.ok) {
            console.log("ne valja");
            return;
        }
        console.log("dodato");

    }
    crtajInput(tip, kontejner, name, txt, klasa) {

        const lbl = document.createElement("label");
        lbl.textContent = txt;
        lbl.setAttribute("for", name);
        kontejner.appendChild(lbl);

        const inp = document.createElement("input");
        inp.type = tip;
        inp.classList.add(klasa);
        kontejner.appendChild(inp);
        inp.name = name;

        return inp;
    }
    async crtajDesni() {

        const leviDiv = document.createElement("div");
        leviDiv.classList.add("desni");
        leviDiv.classList.add("kartica");

        const naslov = document.createElement("h3");
        naslov.textContent = "Materijal u najvecoj kolicini";
        leviDiv.appendChild(naslov);

        const mat = document.createElement("h3");
        mat.textContent = await this.getNajkorisceniji();
        leviDiv.appendChild(mat);
        return leviDiv;

    }
    async getNajkorisceniji() {
        const response = await fetch(`http://localhost:5043/Stovariste/MaterijalUNajvecojKolicini/${this.stovariste.id}`);
        if (!response.ok) {
            console.log("ne valja");
            return;
        }
        const data = await response.json();
        console.log(data);
        console.log(data.naziv);
        return data.naziv + "(" + data.datum + ")";
    }
    crtajSrednji() {

        const leviDiv = document.createElement("div");
        leviDiv.classList.add("srednji");
        leviDiv.classList.add("kartica");

        const naslov = document.createElement("h3");
        naslov.textContent = "Kupovina materijala";
        leviDiv.appendChild(naslov);

        const divZaInput = document.createElement("div");
        leviDiv.appendChild(divZaInput);
        divZaInput.classList.add("divInputSrednji");
        const naziv = this.crtajInput("text", divZaInput, "naziv", "", "inputSrednji");
        /*naziv.value = "Naziv materijala....";*/
        const kolicina = this.crtajInput("text", divZaInput, "kolicina", "", "inputSrednji");
        /*kolicina.value = "Kolicina...";*/
        divZaInput.appendChild(naziv);

        const inp = document.createElement("select");

        const btn = document.createElement("button");
        btn.textContent = "Nadji";
        divZaInput.appendChild(btn);
        btn.onclick = async () => {
            console.log(naziv.value);
            this.napuniSelect(inp, naziv.value);
            console.log("clikc nadji");
        }
        btn.classList.add("dugmenceSrednje");



        inp.classList.add("select");
        divZaInput.appendChild(inp);
        inp.name = "select";

        divZaInput.appendChild(kolicina);

        const btn1 = document.createElement("button");
        btn1.textContent = "Kupi";
        divZaInput.appendChild(btn1);
        btn1.onclick = async () => {
            console.log(inp.value);
            this.kupi(inp.value, kolicina.value);
        }
        btn1.classList.add("dugmenceSrednje");
        return leviDiv;
    }
    async kupi(materijalID, kol) {
        const response = await fetch(`http://localhost:5043/Stovariste/KupovinaMaterijala/${this.stovariste.id}/${materijalID}/${kol}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.log("ne valja");
            return;
        }

    }
    async napuniSelect(select, text) {
        //ocisti select
        const response = await fetch(`http://localhost:5043/Stovariste/PronadjiMaterijal/${this.stovariste.id}/${text}`);
        if (!response.ok) {
            console.log("ne valja");
            return;
        }
        const data = await response.json();
        console.log(data);
        for (let l of data) {
            const opt = document.createElement("option");
            opt.value = l.materijal.id;
            console.log(l);
            opt.textContent = l.materijal.naziv + "|" + l.cena + "| Dostupno" + l.kolicina;
            select.appendChild(opt);


        }
    }
}