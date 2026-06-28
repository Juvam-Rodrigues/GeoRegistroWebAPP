document.addEventListener("DOMContentLoaded", function () {

    const btnCadastrarTerreno = document.getElementById("btnCadastrarTerreno");

    btnCadastrarTerreno.addEventListener("click", async function (event) {

        const todosInputs = document.querySelectorAll('.coordenada');

        const coordenadasValidas = [];

        todosInputs.forEach(input => {
            //Há conteúdo dentro dos nputs
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
        coordenadasValidas.push(coordenadasValidas[0]);

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
                alert("Erro: falha ao cadastrar terreno: " + texto);
                return;
            }

            alert("Terreno cadastrado com sucesso!");

        } catch (error) {
            console.error(error);
            alert("Erro: falha ao conectar com a API.");
        }

    });

});