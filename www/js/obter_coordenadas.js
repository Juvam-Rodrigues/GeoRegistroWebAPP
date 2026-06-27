document.addEventListener("click", function(event) {
    //Espera antes de recarregar a página
        event.preventDefault(); 
        const idUsuario = localStorage.getItem("idUsuario");

        if (!idUsuario) {
            alert("Erro: Usuário não identificado. Faça login novamente.");
            window.location.replace("login.html");
            return;
        }else{
            if (event.target.classList.contains("cadastrobtn")) {

                const campos = document.querySelectorAll(".coordenada");
                const coordenadas = [];

                campos.forEach(campo => {
                    coordenadas.push(campo.value);
                });
                console.log(coordenadas);
                
            }
        }
});