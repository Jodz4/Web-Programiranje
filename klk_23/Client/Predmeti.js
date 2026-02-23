export class Predmeti {
    constructor(listaPredmeta, onSelectionChange) {
        this.listaPredmeta = listaPredmeta;
        this.onSelectionChange = onSelectionChange;
        this.container = null;
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.className = "predmeti-lista";

        this.listaPredmeta.forEach(p => {
            const wrap = document.createElement("div");
            wrap.className = "checkbox-wrap";

            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.value = p.id;
            cb.onchange = () => this.onSelectionChange();

            const label = document.createElement("label");
            label.textContent = p.naziv;
            label.style.color = p.boja;

            wrap.appendChild(cb);
            wrap.appendChild(label);
            this.container.appendChild(wrap);
        });

        host.appendChild(this.container);
    }

    getSelektovani() {
        if (!this.container) return [];
        const selektovani = this.container.querySelectorAll("input:checked");
        return Array.from(selektovani).map(i => parseInt(i.value));
    }
}