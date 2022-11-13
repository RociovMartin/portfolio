/* Este es el elemento que sera modificado por la funcion */
var desplegar=document.getElementById("contenedor-niveles");
var nbot = document.getElementsByClassName("boton-niveles").length;
var fullsize = (102*nbot + 20*(nbot-1) + 40);

function desplegarNiveles(){
    /* Le decimos el boton al que hay que dar click para que aplique el estilo */
    document.getElementById("boton-desplegable-niveles").onclick = segundo;
    /* Estilo */
    desplegar.style.width=(fullsize+"px");
    desplegar.style.marginLeft="20px";
}
/* Esto hace que al darle click pliegue el menu */
function segundo(){
    console.log(nbot);
    console.log(fullsize);
    document.getElementById("boton-desplegable-niveles").onclick = desplegarNiveles;
    /* Estilo */
    desplegar.style.width="0px";
    desplegar.style.marginLeft="0px";
}