export class Sediste {
    constructor(red, broj, status, projekcija) {
        this.red = red;
        this.broj = broj;
        this.status = status; // "slobodno" ili "zauzeto"
        this.projekcija = projekcija;
        this.container = null;
    }

    crtaj(host) {
        if (!host) {
            console.error("Greska: Host element za sediste ne postoji!");
            return;
        }

        this.container = document.createElement("div");
        this.container.className = `sediste-box ${this.status}`;
        this.container.innerText = `Red: ${this.red}; Broj: ${this.broj}`;

        // Ako je slobodno, dodajemo klik
        if (this.status === "slobodno") {
            this.container.onclick = () => {
                console.log(`Kliknuto na sediste: Red ${this.red}, Broj ${this.broj}`);
                this.projekcija.selektujSediste(this);
            };
        } else {
            this.container.style.cursor = "not-allowed";
        }

        host.appendChild(this.container);
    }

    postaviZauzeto() {
        this.status = "zauzeto";
        if (this.container) {
            this.container.className = "sediste-box zauzeto";
            this.container.onclick = null;
            this.container.style.cursor = "not-allowed";
            this.container.classList.remove("selektovano");
        }
    }
}