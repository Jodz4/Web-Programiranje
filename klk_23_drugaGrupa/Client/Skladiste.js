export class Skladiste {
    constructor(id, kapacitet, elementi) {
        this.id = id;
        this.kapacitet = kapacitet;
        this.elementi = elementi;
        this.container = null;
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.className = "skladiste-red";
        host.appendChild(this.container);
        this.osveziPrikaz();
    }

    osveziPrikaz() {
        this.container.innerHTML = "";
        this.elementi.forEach(elData => {
            const el = document.createElement("div");
            el.className = "element-skladista";
            
            const velicina = elData.velicina;
            el.textContent = velicina;
            el.style.flex = velicina;

            el.onclick = () => {
                if (confirm(`Da li želite da obrišete element veličine ${velicina}?`)) {
                    this.obrisiMe(elData.id);
                }
            };
            this.container.appendChild(el);
        });
    }

    async obrisiMe(idElementa) {
        try {
            const res = await fetch(`http://localhost:5231/Kolokvijum/ObrisiElement/${this.id}/${idElementa}`, {
                method: "DELETE"
            });

            if (res.ok) {
                // Lokalno ažuriranje niza bez osvežavanja cele stranice
                this.elementi = this.elementi.filter(el => el.id !== idElementa);
                this.osveziPrikaz();
            } else {
                alert("Greska prilikom brisanja.");
            }
        } catch (err) {
            console.error("Mrežna greška:", err);
        }
    }
}