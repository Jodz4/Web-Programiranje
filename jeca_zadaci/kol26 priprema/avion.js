export class Avion {
    constructor(container) {
        this.container = container;
        this.gate = "";
        this.rows = 0;
        this.seatsInRow = 0;
        this.price = 0;
        this.zauzetaSedista = [];
    }
    clearContainer(cont) {
        if (cont == null)
            return;
        while (cont.firstChild)
            cont.removeChild(cont.firstChild);
    }
    async crtajAvion(letbroj) {
        const planeContainer = document.querySelector(".plane");
        this.clearContainer(planeContainer);
        this.zauzetaSedista = [];
        this.preuzmiLet(letbroj);

        const kokpit = document.createElement("div");
        const sed = document.createElement("div");
        const rep = document.createElement("div");
        rep.classList.add("rep");
        sed.classList.add("sed");
        const p1 = document.createElement("p");
        p1.textContent = `Cena karte ${this.price}`;

        const p2 = document.createElement("p");
        p2.textContent = `Pored prozora ${this.price * 1.1}`;

        const p3 = document.createElement("p");
        p3.textContent = `Cena karte ${this.price * 0.95}`;

        kokpit.appendChild(p1);
        kokpit.appendChild(p2);
        kokpit.appendChild(p3);

        kokpit.classList.add("kokpit");


        this.container.appendChild(kokpit);
        this.container.appendChild(sed);
        this.container.appendChild(rep);
    }

    async preuzmiLet(letBroj) {
        try {
            const response = await fetch(`https://localhost:7262/Airport/GetFlights/${letBroj}`);

            if (!response.ok) {
                const error = await response.text();
                console.error(error);
                return;
            }

            const letSaBrojem = await response.json();
            this.gate = letSaBrojem.gate;
            this.rows = letSaBrojem.rows;
            this.seatsInRow = letSaBrojem.seatsInRow;
            this.price = letSaBrojem.price;
        }
        catch (e) {
            console.error(`Fetch failed: ${e}`);
        }
    }
}