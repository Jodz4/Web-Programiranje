export class Form {
    constructor() {
        this.polja = {};
        this.cbUpisi = null;
    }

    crtaj(host) {
        const formContainer = document.createElement("div");
        formContainer.className = "forma-con";

        this.polja["polje"] = this.dodajInput("Broj polja:", formContainer);
        this.polja["velicina"] = this.dodajInput("Veličina:", formContainer);

        const btn = document.createElement("button");
        btn.textContent = "Upisi";
        btn.className = "btn-list";
        
        btn.onclick = () => {
            if (this.cbUpisi) this.cbUpisi();
        };

        formContainer.appendChild(btn);
        host.appendChild(formContainer);
    }

    dodajInput(labelText, container) {
        const red = document.createElement("div");
        red.className = "forma-red";

        const label = document.createElement("label");
        label.textContent = labelText;
        label.className = "forma-label";

        const input = document.createElement("input");
        input.type = "number";
        input.className = "forma-input";

        red.appendChild(label);
        red.appendChild(input);
        container.appendChild(red);

        return input;
    }
}