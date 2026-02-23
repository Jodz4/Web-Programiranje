export class StudentOcene {
    constructor() {
        this.container = null;
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.className = "studenti-prikaz-glavni";
        host.appendChild(this.container);
    }

    osvezi(podaci, configPredmeta) {
    this.container.innerHTML = "";

    if (!podaci || podaci.length === 0) return;

    // Mapa predmetId → boja
    const bojeMapa = new Map(
        configPredmeta.map(p => [p.id, p.boja])
    );

    const studentiMapa = new Map();

    podaci.forEach(o => {

        const sId = o.studentId ?? o.student?.id;
        const imeStudenta = o.imePrezime ?? o.student?.imePrezime;
        const predmetId = o.predmetId ?? o.predmet?.id;
        const ocena = o.ocena ?? o.vrednost;

        if (!sId || !imeStudenta || !predmetId || !ocena) return;

        if (!studentiMapa.has(sId)) {
            studentiMapa.set(sId, {
                ime: imeStudenta,
                ocene: []
            });
        }

        studentiMapa.get(sId).ocene.push({
            vrednost: ocena,
            predmetId: predmetId
        });
    });

    studentiMapa.forEach(student => {

        // Ako student nema nijednu validnu ocenu – preskoči
        if (student.ocene.length === 0) return;

        const studentCard = document.createElement("div");
        studentCard.className = "student-card";

        const ime = document.createElement("div");
        ime.className = "student-ime";
        ime.textContent = student.ime;
        studentCard.appendChild(ime);

        const chart = document.createElement("div");
        chart.className = "chart-area";

        student.ocene.forEach(o => {

            const stubic = document.createElement("div");
            stubic.className = "stubic";

            // Visina 6–10
            const visina = (o.vrednost - 5) * 20;
            stubic.style.height = `${visina}px`;

            stubic.style.backgroundColor =
                bojeMapa.get(o.predmetId) || "gray";

            chart.appendChild(stubic);
        });

        studentCard.appendChild(chart);
        this.container.appendChild(studentCard);
    });
}
}