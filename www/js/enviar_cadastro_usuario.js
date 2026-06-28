document.addEventListener("DOMContentLoaded", function () {

    const formCadastro = document.getElementById("formCadastro");

    formCadastro.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const nome = document.getElementById("nome").value;
        const senha = document.getElementById("senha").value;

        const dados = { nome, email, senha };

        try {
            const resposta = await fetch("https://georegistro-api.onrender.com/cadastrarusuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const respostaTexto = await resposta.text();

            if (!resposta.ok) {
                alert("Erro ao cadastrar usuário: " + respostaTexto);
                return;
            }

            console.log("ID do usuário:", respostaTexto);

            alert("Usuário cadastrado com sucesso!");

        } catch (erro) {
            console.error(erro);
            alert("Erro: falha ao conectar com a API.");
        }

    });

});