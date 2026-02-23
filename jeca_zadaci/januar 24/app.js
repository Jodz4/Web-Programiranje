export class App {
    constructor(levi, desni, sobe) {
        this.leviDiv = levi;
        this.desniDiv = desni;
        this.sobe = sobe;
        this.korisnici = [];
    }
    crtaj() {
        this.crtajLevi();
        this.crtajDesni();

    }
    crtajElement(tip, kontejner, klasa, txt, name, dodatniTip) {
        const el = document.createElement(tip);
        el.name = name;
        if (klasa != "")
            el.classList.add(klasa);
        if (dodatniTip != "")
            el.type = dodatniTip;
        kontejner.appendChild(el);
        el.textContent = txt;
        return el;
    }
    crtajDesni() {
        this.brisiKartice();
        for (let l of this.sobe) {
            this.crtajKarticu(l, this.desniDiv);
        }
    }
    async crtajKarticu(soba, cont) {
        const kartica = this.crtajElement("element", cont, "kartica", "", "", "");
        const h = document.createElement("h3");
        h.textContent = soba.naziv;
        console.log(soba.naziv);
        const p = document.createElement("p");
        p.textContent = "Clanovi: ";

        kartica.appendChild(h);
        kartica.appendChild(p);

        const response = await fetch(`https://localhost:7080/Chat/VratiClanoveSobe/${soba.id}`);
        if (!response.ok) {
            console.log("nema korisnika");
            return;
        }
        const lista = document.createElement("ul");
        const data = await response.json();
        for (let l of data) {
            const item = document.createElement("li");
            item.textContent = l.korisnickoIme + " | " + l.nadimak;
            item.style.color = l.boja;
            console.log(l.boja);
            lista.appendChild(item);
        }
        kartica.appendChild(lista);

        const btn = this.crtajElement("button", kartica, "pretraziBtn", "Prikazi jedinstvene", "", "");
        btn.onclick = async () => {
            const response = await fetch(`https://localhost:7080/Chat/PrebrojJedinstvene/${soba.id}`);
            if (!response.ok) {
                console.log("nema jedinstveniho");
                return;
            }
            const data = await response.text();
            alert("Broj jedinstvenih u sobi: " + soba.naziv + "je : " + data);

        }
    }
    brisiKartice() {
        while (this.desniDiv.firstChild)
            this.desniDiv.removeChild(this.desniDiv.firstChild);
    }
    async crtajLevi() {
        const lbl1 = this.crtajElement("label", this.leviDiv, "sd12", "Soba:", "soba");
        const sobaInput = this.crtajElement("input", this.leviDiv, "sd23", "", "sobaInput", "text");

        const lbl2 = this.crtajElement("label", this.leviDiv, "sd12", "Korisnik:", "korisnik", "");
        const korisnik = this.crtajElement("select", this.leviDiv, "sd23", "", "korisnikInput", "");
        await this.popuniKorisnike(korisnik);

        const lbl3 = this.crtajElement("label", this.leviDiv, "sd12", "Nadimak:", "nadimak");
        const nadimak = this.crtajElement("input", this.leviDiv, "sd23", "", "nadimakInput", "text");

        const lbl4 = this.crtajElement("label", this.leviDiv, "sd12", "Boja:", "boja");
        const boja = this.crtajElement("input", this.leviDiv, "sd23", "", "bojaInput", "color");


        const btn = this.crtajElement("button", this.leviDiv, "dugmence", "Dodaj", "dugme");
        btn.onclick = async () => {
            console.log("kliknuto");
            await this.dodaj(sobaInput.value, korisnik.value, nadimak.value, boja.value);
            korisnik.value = "";
            nadimak.value = "";
            sobaInput.value = "";
        }
    }
    //mora ovako da se salje put zbog boje 
    async dodaj(soba, korisnikId, nadimak, boja) {
        const response = await fetch(
            `https://localhost:7080/Chat/UbaciKorisnikaUSobu/${encodeURIComponent(soba)}/${korisnikId}/${encodeURIComponent(nadimak)}/${encodeURIComponent(boja)}`, {
            method: "POST"
        }
        );
        if (!response.ok) {
            console.log("nije dodato");
            return;
        }
        console.log("dodat korisnik");
        this.crtajDesni();

    }
    async popuniKorisnike(select) {

        const response = await fetch("https://localhost:7080/Chat/VratiKorisnike");
        if (!response.ok) {
            console.log("neka korisnika");
            return;
        }
        const data = await response.json();
        for (let l of data) {
            const opt = this.crtajElement("option", select, "", l.korisnickoIme, "", "");
            opt.value = l.id;
        }
        this.korisnici = data;
    }
}