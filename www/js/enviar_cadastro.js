document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("formCadastro");

    formLogin.addEventListener("submit", async function (event) {
        //Espera antes de recarregar a página
        event.preventDefault(); 

        //Pegando email e senha do form e colocando numa variavel dados
        var email = document.getElementById("email").value;
        var nome = document.getElementById("nome").value;
        var senha = document.getElementById("senha").value
        var dados = {
            nome: nome,
            email: email,
            senha: senha
        };

        //tentando se conectar com a api e mandar o objeto "dados"
        try {
            const resposta = await fetch("http://localhost:8080/cadastrarusuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!resposta.ok) {
                throw new Error("Erro ao fazer cadastro");
            }

            const idUsuario = await resposta.text();

            console.log("ID do usuário:", idUsuario);

            alert("Usuário cadastrado com sucesso!");

        } catch (erro) {
            console.error(erro);
            alert("Erro.");
        }



    });
});