
let contadorPontos = 1;

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Enter" &&
        event.target.classList.contains("coordenada")
    ) {
        event.preventDefault();

        if (event.target.value.trim() === "") return;

        contadorPontos++;

        const container = document.getElementById("lista-pontos");

        
        const botao = document.querySelector(".cadastrobtn");
        botao.remove();

        const novoPonto = document.createElement("div");
        novoPonto.className = "mb-3";

        novoPonto.innerHTML = `
            <label class="form-label">Ponto ${contadorPontos}</label>

            <div class="d-flex gap-2 linha-ponto">
                <input
                    type="text"
                    name="coordenadas[]"
                    class="form-control coordenada"
                    placeholder="Coordenada">
            </div>
        `;

        container.appendChild(novoPonto);

       
        novoPonto.querySelector(".linha-ponto").appendChild(botao);

        novoPonto.querySelector("input").focus();
    }
});
