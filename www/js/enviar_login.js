document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", async function (event) {
        //Espera antes de recarregar a página
        event.preventDefault(); 

        //Pegando email e senha do form e colocando numa variavel dados
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value
        var dados = {
            email: email,
            senha: senha
        };

        //tentando se conectar com a api e mandar o objeto "dados"
        try {
            const resposta = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!resposta.ok) {
                throw new Error("Erro ao fazer login");
            }

            const idUsuario = await resposta.text();
            console.log("ID do usuário:", idUsuario);

            // Salva o ID para uso nas próximas páginas
            localStorage.setItem("idUsuario", idUsuario);

            alert("Usuário logado com sucesso!");
            window.location.replace("add_coordenadas_terreno.html");

        } catch (erro) {
            console.error(erro);
            alert("Erro.");
        }
    });
});