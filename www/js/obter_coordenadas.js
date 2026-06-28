document.addEventListener("DOMContentLoaded", function () {

    const idUsuario = localStorage.getItem("idUsuario");

    if (!idUsuario) {
        alert("Erro: Você não está logado.");
        window.location.replace("index.html");
        return;
    }

    const container = document.getElementById("lista-pontos");
    let contadorPontos = 1;
    const coordenadas = [];

    function obterLocalizacao() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocalização não suportada"));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }

    async function capturar(event) {
        const botao = event.target;

        try {
            const posicao = await obterLocalizacao();

            const ponto = [
                posicao.coords.longitude,
                posicao.coords.latitude
            ];

            coordenadas.push(ponto);

            console.log("ARRAY ATUAL:", coordenadas);

            const input = botao.parentElement.querySelector("input");
            input.value = ponto.join(",");

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

        } catch (error) {
            console.error("Erro ao obter localização:", error);

            if (error.code === 1) {
                alert("Permissão de localização negada. Ative no navegador.");
            } else if (error.code === 2) {
                alert("Localização indisponível.");
            } else if (error.code === 3) {
                alert("Tempo de resposta excedido.");
            } else {
                alert("Erro ao capturar localização.");
            }
        }
    }

    function deslogar(event) {
        localStorage.removeItem("idUsuario");
        window.location.replace("index.html");
    }

    document.querySelector(".cadastrobtn")
        .addEventListener("click", capturar);

    document.querySelector("#btnDeslogar")
        .addEventListener("click", deslogar);
});