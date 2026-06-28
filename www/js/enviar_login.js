document.addEventListener("DOMContentLoaded", function () {

    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const dados = {
            email: email,
            senha: senha
        };

        try {
            const resposta = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const texto = await resposta.text();

            if (!resposta.ok) {
                alert("Erro: falha ao fazer login: " + texto);
                return;
            }

            const idUsuario = texto;

            console.log("ID do usuário:", idUsuario);

            localStorage.setItem("idUsuario", idUsuario);

            alert("Usuário logado com sucesso!");
            window.location.replace("add_coordenadas_terreno.html");

        } catch (erro) {
            console.error(erro);
            alert("Erro: falha ao conectar com a API.");
        }
    });

});