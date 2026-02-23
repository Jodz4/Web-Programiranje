export class Biljka {
    constructor(cont, id, naziv, slika, v, p, pv) {
        this.container = cont;
        this.vidjenja = v;
        this.ime = naziv;
        this.id = id;
        this.slika = slika;
        this.podrucjeid = p;
        this.podrucjev = pv
    }
    static obrisiBiljcice(cont) {
        while (cont.firstChild)
            cont.removeChild(cont.firstChild);
    }
    crtajKarticu(divp) {
        //treba dodati i sliku da se crta mene mrzelo 
        const naziv = document.createElement("h3");
        naziv.textContent = this.ime;
        const kartica = document.createElement("div");
        const brV = document.createElement("p");
        brV.textContent = this.vidjenja;

        const btn = document.createElement("button");
        btn.textContent = "Vidjena";
        kartica.appendChild(naziv);
        kartica.appendChild(brV);
        kartica.appendChild(btn);
        kartica.classList.add("karticaBiljke");
        divp.appendChild(kartica);

        btn.onclick = async () => {
            console.log("vidjeno");
            this.upisiVidjenje();
            brV.textContent = this.vidjenja;
            btn.setAttribute('disabled', 'disabled');
        }

    }
    async upisiVidjenje() {

        const podaciZaSlanje = {
            id: 0,
            latitude: 44.7866,
            longitude: 20.4489,
            datumIVreme: new Date().toISOString(),
            podrucje: {
                id: this.podrucjeid,
                naziv: `${this.podrucjev}`
            }
        };

        this.vidjenja++;
        const response = await fetch(`https://localhost:7011/Biljke/UpisiVidjenje/${this.id}/${this.podrucjeid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(podaciZaSlanje)
        });
    }
}