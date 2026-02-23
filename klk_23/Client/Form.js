export class Form {
    constructor(osveziCallback) {
        this.inputi = {};
        this.osveziCallback = osveziCallback;
    }

    crtaj(host) {
        const formContainer = document.createElement("div");
        formContainer.className = "forma-con";

        this.inputi["indeks"] = this.dodajInput("Broj indeksa:", formContainer);
        this.inputi["student"] = this.dodajInput("Ime i prezime:", formContainer);
        this.inputi["predmet"] = this.dodajInput("Predmet:", formContainer);
        this.inputi["ocena"] = this.dodajInput("Ocena:", formContainer);

        const btn = document.createElement("button");
        btn.textContent = "Upisi";
        btn.className = "btn-upisi";
        btn.onclick = () => this.upisiOcenu();

        formContainer.appendChild(btn);
        host.appendChild(formContainer);
    }

    dodajInput(labelText, container) {
        const red = document.createElement("div");
        red.className = "forma-red";

        const label = document.createElement("label");
        label.textContent = labelText;

        const input = document.createElement("input");

        red.appendChild(label);
        red.appendChild(input);
        container.appendChild(red);

        return input;
    }

    async upisiOcenu() {
        const bodyObjekat = {
            brojIndeksa: parseInt(this.inputi["indeks"].value),
            imePrezime: this.inputi["student"].value,
            predmet: this.inputi["predmet"].value,
            ocena: parseInt(this.inputi["ocena"].value)
        };

        // VALIDACIJA
        if (
            !bodyObjekat.brojIndeksa ||
            !bodyObjekat.imePrezime ||
            !bodyObjekat.predmet ||
            bodyObjekat.ocena < 6 ||
            bodyObjekat.ocena > 10
        ) {
            alert("Unesite ispravne podatke (ocena 6-10).");
            return;
        }

        const response = await fetch("http://localhost:5192/Ocene/DodajOcenu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyObjekat)
        });

        if (response.ok) {
            await this.osveziCallback();
            this.ocistiFormu();
        } else {
            alert("Greška pri upisu ocene.");
        }
    }

    ocistiFormu() {
        Object.values(this.inputi).forEach(i => i.value = "");
    }
}