document.addEventListener("DOMContentLoaded", function () {

    const idUsuario = localStorage.getItem("idUsuario");

    if (!idUsuario) {
        alert("Erro: Você não está logado.");
        window.location.replace("index.html");
        return;
    }
    else {
        const container = document.getElementById("lista-pontos");
        let contadorPontos = 1;
        const coordenadas = [];

        function obterLocalizacao() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        }

        async function capturar(event) {
            const botao = event.target;

            const posicao = await obterLocalizacao();

            const ponto = [
                posicao.coords.longitude,
                posicao.coords.latitude
            ];

            coordenadas.push(ponto);

            console.log("ARRAY ATUAL:", coordenadas);

            const input = botao.parentElement.querySelector("input");
            input.value = ponto.join(","); //Ele pega um array e transforma cada item em string, juntando tudo usando , como separador

            botao.remove();
            contadorPontos++;

            const novoPonto = document.createElement("div");
            novoPonto.className = "mb-3";

            novoPonto.innerHTML = `
            <label class="form-label">Ponto ${contadorPontos}</label>
            <div class="d-flex gap-2 linha-ponto">
                <input type="text" class="form-control coordenada" placeholder="Coordenada">
                <button type="button" class="btn cadastrobtn">Capturar</button>
            </div>
        `;

            container.appendChild(novoPonto);

            novoPonto.querySelector("button")
                .addEventListener("click", capturar);
        }

        document.querySelector(".cadastrobtn")
            .addEventListener("click", capturar);
    }
});