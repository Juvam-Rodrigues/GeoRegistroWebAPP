document.addEventListener("click", function(event) {

    if (event.target.classList.contains("cadastrobtn")) {

        const campos = document.querySelectorAll(".coordenada");

        const coordenadas = [];

        campos.forEach(campo => {
            coordenadas.push(campo.value);
        });

        console.log(coordenadas);
    }
});