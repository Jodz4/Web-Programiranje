export class Automobil {
    constructor(podaci, korisnikRef, parentRef) {
        this.podaci = podaci;
        this.korisnikRef = korisnikRef;
        this.parentRef = parentRef;
        this.container = null;
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.className = "auto-kartica";
        this.container.style.backgroundColor = this.podaci.iznajmljen ? "#f88" : "#8f8";

        this.container.innerHTML = `
            <div><strong>Model:</strong> ${this.podaci.model}</div>
            <div>Kilometraža: ${this.podaci.km}</div>
            <div>Godište: ${this.podaci.godiste}</div>
            <div>Broj sedišta: ${this.podaci.sedista}</div>
            <div>Cena po danu: ${this.podaci.cena}€</div>
            <div>Iznajmljen: ${this.podaci.iznajmljen}</div>
        `;

        const btnIznajmi = document.createElement("button");
        btnIznajmi.textContent = "Iznajmi";
        btnIznajmi.disabled = this.podaci.iznajmljen;
        btnIznajmi.onclick = () => this.iznajmiAuto();

        this.container.appendChild(btnIznajmi);
        host.appendChild(this.container);
    }

    async iznajmiAuto() {
        const k = this.korisnikRef.getPodatke();

        // Validacija po uslovu zadatka
        if (!k.ime || k.jmbg.length !== 13 || k.brojVozacke.length !== 9 || isNaN(k.brDana) || k.brDana <= 0) {
            alert("Greška: JMBG mora imati 13 cifara, Broj dozvole 9 cifara!");
            return;
        }

        const resp = await fetch(`http://localhost:5231/RentACar/Iznajmi/${this.podaci.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(k)
        });

        if (resp.ok) {
            alert("Uspešno iznajmljeno!");
            this.parentRef.ucitajSveAutomobile(); // Automatsko osvežavanje prikaza
        } else {
            const poruka = await resp.text();
            alert(poruka);
        }
    }
}