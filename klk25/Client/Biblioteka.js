// Biblioteka.js
export class Biblioteka {
    constructor(id, naziv, adresa, email) {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.email = email;
        this.polja = {};
        this.container = null;
    }

    crtaj(host) {

    this.container = document.createElement("div");
    this.container.className = "biblioteka-con";
    host.appendChild(this.container);

    // === NASLOV BIBLIOTEKE (unutar box-a) ===
    const naslov = document.createElement("h2");
    naslov.textContent = this.naziv;
    naslov.style.width = "100%";
    naslov.style.textAlign = "center";
    naslov.style.marginBottom = "15px";
    this.container.appendChild(naslov);

    // =======================
    // 1. KOLONA – KNJIGA
    // =======================

    const kolona1 = document.createElement("div");
    kolona1.className = "kolona";
    this.container.appendChild(kolona1);

    kolona1.innerHTML = "<h3>Knjiga</h3>";

    this.polja["naslov"] = this.dodajInput("Naslov:", "text", kolona1);
    this.polja["autor"] = this.dodajInput("Autor:", "text", kolona1);
    this.polja["godina"] = this.dodajInput("Godina:", "number", kolona1);
    this.polja["izdavac"] = this.dodajInput("Izdavač:", "text", kolona1);
    this.polja["broj"] = this.dodajInput("Broj:", "number", kolona1);

    const btnDodaj = document.createElement("button");
    btnDodaj.textContent = "Dodaj";
    btnDodaj.className = "btn-plavi";
    btnDodaj.onclick = () => this.dodajKnjiguNaServer();
    kolona1.appendChild(btnDodaj);

    // =======================
    // 2. KOLONA – IZDAVANJE
    // =======================

    const kolona2 = document.createElement("div");
    kolona2.className = "kolona";
    this.container.appendChild(kolona2);

    kolona2.innerHTML = "<h3>Izdavanje/Vraćanje</h3>";

    this.polja["pretraga"] = this.dodajInput("Pretraga:", "text", kolona2);
    this.polja["pretraga"].oninput = () => this.pretraziKnjige();

    this.selectKnjiga = document.createElement("select");
    this.selectKnjiga.className = "knjiga-select";
    kolona2.appendChild(this.selectKnjiga);

    const btnIzdaj = document.createElement("button");
    btnIzdaj.textContent = "Izdaj/Vrati";
    btnIzdaj.className = "btn-plavi";
    btnIzdaj.onclick = () => this.izdajVratiKnjigu();
    kolona2.appendChild(btnIzdaj);

    // =======================
    // 3. KOLONA – NAJČITANIJA
    // =======================

    const kolona3 = document.createElement("div");
    kolona3.className = "kolona";
    this.container.appendChild(kolona3);

    kolona3.innerHTML = "<h3>Najčitanija knjiga</h3>";

    this.infoNajcitanija = document.createElement("div");
    this.infoNajcitanija.className = "info-najcitanija";
    kolona3.appendChild(this.infoNajcitanija);
}

    dodajInput(labelText, tip, host) {
        const red = document.createElement("div");
        red.className = "red";
        red.innerHTML = `<label>${labelText}</label>`;
        const input = document.createElement("input");
        input.type = tip;
        red.appendChild(input);
        host.appendChild(red);
        return input;
    }

   async dodajKnjiguNaServer() {

    if (!this.polja["naslov"].value ||
        !this.polja["autor"].value ||
        !this.polja["godina"].value ||
        !this.polja["izdavac"].value ||
        !this.polja["broj"].value) {

        alert("Popunite sva polja!");
        return;
    }

   const knjigaObj = {
    naslov: this.polja["naslov"].value,
    autor: this.polja["autor"].value,
    godinaIzdavanja: parseInt(this.polja["godina"].value),
    izdavac: this.polja["izdavac"].value,
    brojUEvidenciji: this.polja["broj"].value
};

    const resp = await fetch(
        `http://localhost:5215/Biblioteka/DodavanjeKnjige/${this.id}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(knjigaObj)
        }
    );

    if (!resp.ok) {
        const text = await resp.text();
        alert(text);
        return;
    }

    alert("Knjiga je uspešno dodata!");
    this.prikaziNajcitaniju();
}

    async pretraziKnjige() {
        const term = this.polja["pretraga"].value;
        if (term.length < 1) {
            this.selectKnjiga.innerHTML = "";
            return;
        }

        const resp = await fetch(`http://localhost:5215/Biblioteka/PronadjiKnjigePoKriterijumu/${this.id}/${term}`);
        const podaci = await resp.json();

        this.selectKnjiga.innerHTML = "";
        podaci.forEach(k => {
            const opt = document.createElement("option");
            opt.value = k.id;
            opt.textContent = `${k.naslov}-${k.autor} (${k.izdata ? 'Vrati' : 'Izdaj'})`;
            this.selectKnjiga.appendChild(opt);
        });
    }

    async izdajVratiKnjigu() {
        const idKnjige = this.selectKnjiga.value;
        if (!idKnjige) return;

        const resp = await fetch(`http://localhost:5215/Biblioteka/IzdavanjeVracanjeKnjige/${this.id}/${idKnjige}`, {
            method: "PUT"
        });

        if (resp.ok) {
            this.prikaziNajcitaniju();
            this.pretraziKnjige();
        }
    }

    async prikaziNajcitaniju() {
        const resp = await fetch(`http://localhost:5215/Biblioteka/Najcitanija/${this.id}`);
        const text = await resp.text();
        this.infoNajcitanija.textContent = text || "";
    }
}