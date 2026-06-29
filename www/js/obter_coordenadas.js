document.addEventListener("DOMContentLoaded", function () {

    const map = L.map('map').setView([-5.7945, -35.2110], 13); // No mapa vai aparecer Natal por padrão
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const pontosMapa = [];

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

    //Função para esperar entre capturas para não travar
    function pausarEntreCapturasDeMelhorPosicao(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //Função que vai rodar 10 capturas da mesma coordenada para ver se consegue a melhor precisão: <= 20
    async function capturarMelhorPosicao() {
        var capturasDaMesmaPosicao = [];
        for (let i = 0; i < 10; i++) {
            const posicao = await obterLocalizacao();
            capturasDaMesmaPosicao.push(posicao);
            if (i < 9) {
            //Só vai dar um pause até a penúltima captura, pois depois da última não precisa pausar mais
            await pausarEntreCapturasDeMelhorPosicao(500);
            }
        }

        //função para ordenar da menor captura até a maior
        capturasDaMesmaPosicao.sort((a, b) => a.coords.accuracy - b.coords.accuracy);
        return capturasDaMesmaPosicao[0];
    }

    async function capturar(event) {
        const botao = event.target;

        try {
            const melhorCapturaPosicao = await capturarMelhorPosicao();
            const precisaoDaPosicao = melhorCapturaPosicao.coords.accuracy;
            console.log("Precisão da coordenda: " + precisaoDaPosicao);

            if (precisaoDaPosicao > 20) {
                alert(`GPS fraco (${Math.round(precisaoDaPosicao)}m). Vá para um local aberto.`);
                return;
            }

            const ponto = [
                melhorCapturaPosicao.coords.longitude,
                melhorCapturaPosicao.coords.latitude
            ];

            coordenadas.push(ponto);
            const lat = ponto[1];
            const lon = ponto[0];

            const marker = L.marker([lat, lon]).addTo(map);
            pontosMapa.push(marker);

            // centraliza o mapa no último ponto
            map.flyTo([lat, lon], 18);

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