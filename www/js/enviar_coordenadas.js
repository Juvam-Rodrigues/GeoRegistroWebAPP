document.addEventListener("DOMContentLoaded", function () {

    const btnCadastrarTerreno = document.getElementById("btnCadastrarTerreno");

    btnCadastrarTerreno.addEventListener("click", async function (event) {

        event.preventDefault();

        const todosInputs = document.querySelectorAll('.coordenada');
        const coordenadasValidas = [];

        todosInputs.forEach(input => {

            if (input.value.trim() !== "") {
                const [lon, lat] = input.value.split(",");

                coordenadasValidas.push({
                    longitude: parseFloat(lon),
                    latitude: parseFloat(lat)
                });
            }
        });

        if (coordenadasValidas.length < 3) {
            alert("Erro: cadastre pelo menos 3 pontos.");
            return;
        }

        // fecha o polígono
        coordenadasValidas.push({
            longitude: coordenadasValidas[0].longitude,
            latitude: coordenadasValidas[0].latitude
        });

        console.log("OK, pronto para enviar:", coordenadasValidas);

        const dados = {
            usuarioId: localStorage.getItem("idUsuario"),
            coordenadas: coordenadasValidas
        };

        try {
            const resposta = await fetch("https://georegistro-api.onrender.com/cadastrarterrenos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const texto = await resposta.text();

            if (!resposta.ok) {
                alert("Erro ao cadastrar terreno: " + texto);
                return;
            }

            alert("Terreno cadastrado com sucesso!");

        } catch (error) {
            console.error("Erro de rede:", error);
            alert("Erro: falha ao conectar com a API.");
        }
    });

});