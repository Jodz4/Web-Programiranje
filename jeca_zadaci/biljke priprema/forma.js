import { Biljka } from "./biljka.js";
export class Forma {
    constructor(cont, biljkeCont) {
        this.container = cont;
        //lista naziva podrucja 
        this.podrucja = [];
        this.bk = biljkeCont;
        this.cvetovi = [];
        this.listovi = [];
        this.stabla = [];

    }
    async crtaj() {
        const podrucje = this.crtajSelect("podrucje", "Podrucje");
        const cvet = this.crtajSelect("cvet", "cvet");
        const list = this.crtajSelect("list", "list"); 4
        const stablo = this.crtajSelect("stablo", "stablo");
        const btn = document.createElement("button");
        btn.textContent = "Pretrazi";
        btn.classList.add("dugmence");
        this.container.appendChild(btn);
        //a sto nece await
        await this.preuzmiPodrucja();
        await this.preuzmiOsobina();
        this.napuniOpcijama(this.cvetovi, cvet, "v");
        this.napuniOpcijama(this.listovi, list, "v");
        this.napuniOpcijama(this.stabla, stablo, "v");
        this.napuniOpcijama(this.podrucja, podrucje, "n");

        btn.onclick = () => {
            this.pretrazi(podrucje.value, podrucje.name);
            console.log(podrucje.value);
        }
    }

    async pretrazi(id, name) {
        Biljka.obrisiBiljcice(this.bk);
        //napravila sam da radi samo po podrucju jer nikako ne mogu osobine da dodam 
        const data = await this.preuzmiBiljke(id);
        for (let l of data) {
            let b = new Biljka(this.biljkeCont, l.id, l.naziv, l.slika, l.brojVidjenja, id, name);
            b.crtajKarticu(this.bk);
        }

    }
    async preuzmiBiljke(id) {
        const response = await fetch(`https://localhost:7011/Biljke/PreuzmiBiljke/${id}`);
        if (!response.ok)
            console.log("greskica");
        const data = await response.json();
        return data;
    }
    crtajSelect(name, lbtxt) {
        const sl = document.createElement("select");
        sl.name = name;
        const lbl = document.createElement("label");

        //not sure
        lbl.textContent = lbtxt;
        lbl.setAttribute("for", sl);
        sl.classList.add("select");
        this.container.appendChild(lbl);
        this.container.appendChild(sl);
        return sl;

    }
    async preuzmiOsobina() {
        const response = await fetch("https://localhost:7011/Osobine/PreuzmiOsobine");
        if (!response.ok)
            console.log("greskica");
        const data = await response.json();
        for (let l of data) {
            if (l.naziv == "Cvet")
                this.cvetovi.push(l);
            else if (l.naziv == "Stablo")
                this.stabla.push(l);
            else if (l.naziv == "List")
                this.listovi.push(l);
        }
    }
    async preuzmiPodrucja() {
        const response = await fetch("https://localhost:7011/Podrucja/PreuzmiPodrcuja");
        if (!response.ok)
            console.log("greskica");
        const data = await response.json();
        for (let l of data) {
            this.podrucja.push(l);
            console.log(l.naziv);
        }
    }
    napuniOpcijama(niz, selectPolje, s) {
        for (let l of niz) {
            const opt = document.createElement("option");
            opt.value = l.identifikator;
            if (s == "n")
                opt.textContent = l.naziv;
            else if (s == "v")
                opt.textContent = l.vrednost;
            opt.name = l.naziv;
            selectPolje.appendChild(opt);
        }
    }
}