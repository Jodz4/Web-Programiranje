export class Red {
    constructor(cont, b) {
        this.container = cont;
        this.biblioteka = b;
    }
    crtaj() {
        const levi = document.createElement("div");
        levi.classList.add("levi");
        levi.classList.add("kartica");
        this.crtajLevi(levi);
        this.container.appendChild(levi);

        const srednji = document.createElement("div");
        srednji.classList.add("srednji");
        srednji.classList.add("kartica");
        this.crtajSrednji(srednji);
        this.container.appendChild(srednji);


        const desni = document.createElement("div");
        desni.classList.add("desni");
        desni.classList.add("kartica");
        this.crtajDesni(desni);
        this.container.appendChild(desni);

    }
    crtajSrednji(cont) {
        const naslov = document.createElement("h3");
        naslov.textContent = "Izdavanje/Vracanje";
        cont.appendChild(naslov);
        const kontZaInput = document.createElement("div");
        cont.appendChild(kontZaInput);
        kontZaInput.classList.add("inputDiv");

        const polje = this.crtajInput("text", "podaci", "", kontZaInput, "search", "hide");
        const selecpolje = document.createElement("select");


        const btn1 = document.createElement("button");
        btn1.textContent = "Nadji   ";
        kontZaInput.appendChild(btn1);
        btn1.onclick = () => {
            this.pronadjiKnjige(polje.value, selecpolje)
            console.log("kliknutosrednji");
        }


        kontZaInput.appendChild(selecpolje);
        selecpolje.classList.add("selectPolje");
        const btn = document.createElement("button");

        selecpolje.onchange = () => {
            this.promenibutton(btn, selecpolje.value);
            console.log(selecpolje.value);
        }
        btn.textContent = "Vrati";
        kontZaInput.appendChild(btn);
        btn.classList.add("column2");
        btn.classList.add("vratiDugmence");
        btn.onclick = async () => {
            await this.vratiIzdajKnjigu(selecpolje);
            await this.promenibutton(btn, selecpolje.value);
        }
    }
    async promenibutton(btn, knjigaid) {
        const response = await fetch(
            `http://localhost:5215/Biblioteka/PronadjiIzdavanje/${knjigaid}`,
        );
        if (!response.ok) {
            console.log("nije proslo" + response.status);

            return;
        }
        const data = await response.json();
        if (data.id != -1)
            btn.textContent = "Vrati";
        else
            btn.textContent = "Izdaj";
        console.log(btn.textContent);
    }
    async vratiIzdajKnjigu(knjiga) {
        const response = await fetch(
            `http://localhost:5215/Biblioteka/IzdavanjeVracanjeKnjige/${this.biblioteka.id}/${knjiga.value}`,
            {
                method: "PUT"
            }
        );

        if (!response.ok) {
            const greska = await response.text();
            console.log("Greška:", greska);
            return;
        }

        const data = await response.json();

    }
    async pronadjiKnjige(data, select) {
        const response = await fetch(
            `http://localhost:5215/Biblioteka/PronadjiKnjigePoKriterijumu/${this.biblioteka.id}/${data}`
        );
        if (!response.ok) {
            console.log("nije proslo" + response.status);
            return;
        }
        const podaci = await response.json();
        select.innerHTML = "";
        for (let l of podaci) {
            console.log(l.naslov + " " + l.autor);
            const opt = document.createElement("option");
            opt.textContent = l.naslov + " " + l.autor;
            opt.value = l.id;
            select.appendChild(opt);
        }

    }
    async crtajDesni(cont) {

        const naslov = document.createElement("h3");
        naslov.textContent = "Najcitanija knjiga";
        cont.appendChild(naslov);
        const response = await fetch(`http://localhost:5215/Biblioteka/Najcitanija/${this.biblioteka.id}`);
        if (!response.ok)
            console.log("ne radi ");
        console.log("proslokod knjige");
        const data = await response.text();
        const knjiga = document.createElement("h1");
        knjiga.textContent = data.toString();
        cont.appendChild(knjiga);
        knjiga.classList.add("redText");

    }
    async dodajKnjigu(naziv, autor, god, izd, br) {
        const knjiga = {
            Naslov: naziv,
            Autor: autor,
            GodinaIzdavanja: god,
            Izdavac: izd,
            BrojUEvidenciji: br
        };

        const idBiblioteke = this.biblioteka.id;
        const response = await fetch(`http://localhost:5215/Biblioteka/DodavanjeKnjige/${idBiblioteke}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(knjiga)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        const dodataKnjiga = await response.json();
        console.log("Knjiga dodata:", dodataKnjiga);
    }
    crtajLevi(cont) {

        const naslov = document.createElement("h3");
        naslov.textContent = "Knjiga";
        cont.appendChild(naslov);
        const kontZaInput = document.createElement("div");
        cont.appendChild(kontZaInput);
        kontZaInput.classList.add("inputDiv");
        const naziv = this.crtajInput("text", "naslov", "Naslov", kontZaInput, "k1El");
        const autor = this.crtajInput("text", "autor", "Autor", kontZaInput, "k1El");
        const godina = this.crtajInput("number", "godina", "Godina", kontZaInput, "k1El");
        const izdavac = this.crtajInput("text", "izdavac", "Izdavac", kontZaInput, "k1El");
        const broj = this.crtajInput("text", "broj", "Broj", kontZaInput, "k1El");
        const btn = document.createElement("button");
        btn.textContent = "Dodaj";
        kontZaInput.appendChild(btn);
        btn.classList.add("column2");
        btn.onclick = () => {
            console.log("kliknuto");
            this.dodajKnjigu(naziv.value, autor.value, godina.value, izdavac.value, broj.value);
            naziv.value = "";
            autor.value = "";
            godina.value = 2026;
            izdavac.value = "";
            broj.value = "";
        }

    }

    crtajInput(tip, name, txt, cont, classtoadd, lblclass) {
        const divf = document.createElement("div");
        const sl = document.createElement("input");
        sl.type = tip;
        sl.name = name;
        sl.classList.add(classtoadd);
        const lbl = document.createElement("label");
        lbl.textContent = txt;
        lbl.classList.add(lblclass);

        cont.appendChild(lbl);
        cont.appendChild(sl);
        return sl;
    }
}