// =======================================
// VIENA · BRATISLAVA · PRAGA
// Script v2.0
// =======================================

let dades = [];

const selector = document.getElementById("daySelect");
const planning = document.getElementById("planning");

async function carregarPlanning() {

    const resposta = await fetch("planning.json");

    dades = await resposta.json();

    omplirSelector();

}

function omplirSelector() {

    selector.innerHTML = "";

    dades.forEach((dia, index) => {

        const opcio = document.createElement("option");

        opcio.value = index;

        opcio.textContent = dia.dia;

        selector.appendChild(opcio);

    });

    mostrarDia(0);

}

function mostrarDia(index) {

    const dia = dades[index];

    document.getElementById("cityName").textContent = dia.ciutat;

document.getElementById("activityCount").textContent =
    dia.activitats.length + " activitats";

document.getElementById("progressFill").style.width = "100%";

    planning.innerHTML = "";

    const card = document.createElement("div");

    card.className = "dayCard";

    card.innerHTML = `

        <div class="dayHeader">
            <h2>${dia.dia}</h2>
            <p>${dia.ciutat}</p>
        </div>

        <div class="timeline"></div>

    `;

    const timeline = card.querySelector(".timeline");

    dia.activitats.forEach(a => {

        const links = a.links
            ? a.links.map(link =>
                `<a href="${link.url}" target="_blank" class="linkButton">${link.text}</a>`
            ).join("")
            : "";

        timeline.innerHTML += `

            <div class="activity">

                <div class="time">
                    ${a.hora}
                </div>

                <div class="content">

                    <h3>${a.titol}</h3>

                    <p>${a.descripcio}</p>

                    <div class="links">
                        ${links}
                    </div>

                </div>

            </div>

        `;

    });

    planning.appendChild(card);

}

selector.addEventListener("change", e => {

    mostrarDia(e.target.value);

});

carregarPlanning();