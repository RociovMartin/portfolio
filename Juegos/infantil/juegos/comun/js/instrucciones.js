/* Variables */
var contenedor = document.querySelector(".contenedor-instrucciones");
var abierto = false;


/* Abre/cierra las instrucciones */
function toggleInstrucciones() {
    if (!abierto) {
        contenedor.style.transform = "translateX(-30px)";
        abierto = true;
    } else {
        contenedor.style.transform = "translateX(-590px)"
        abierto = false;
    }
}
