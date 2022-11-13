/* Éste es el elemento que será modificado por la función. */
var desplegar = document.getElementById("contenedor-niveles");
// Número de botones.
var allButtons = document.getElementsByClassName("boton-niveles");

// Función que calcula el tamaño del menú desplegable a partir del tamaño de sus elementos.
function calcFullSize(firstBut){
    // Tamaño del botón (width + borde).
    var botonSize = getSize(window.getComputedStyle(firstBut).width) + getSize(window.getComputedStyle(firstBut).borderLeftWidth) + getSize(window.getComputedStyle(firstBut).borderRightWidth);
    // Tamaño de los márgenes izquierdo y derecho del último botón (compartido por todos excepto el primero).
    var marginEach = getSize(window.getComputedStyle(allButtons[(allButtons.length)-1]).marginRight) + getSize(window.getComputedStyle(allButtons[(allButtons.length)-1]).marginLeft);
    // Tamaño del márgen izquierdo de sólo el primer botón. El derecho no lo queremos ya que sería demasiado.
    var marginFirst = getSize(window.getComputedStyle(firstBut).marginLeft)/*  + getSize(window.getComputedStyle(firstBut).marginRight) */;
    // Si hay sólo 1 botón entonces no es necesario sumar ambas variables del márgen ya que el primer y el último botón son el mismo.
    if(allButtons.length == 1){
        return (botonSize+marginFirst);
    }
    // Si hay más botones entonces sumamos el márgen del último botón una vez menos ya que se suma el márgen del primer botón por separado.
    var totalMargin = (allButtons.length-1)*marginEach + marginFirst;
    var totalButtons = botonSize*allButtons.length;
    console.log("totalButtons + totalMargin = (botonSize*allButtons.length) + ((allButtons.length-1)*marginEach + marginFirst) = ("+botonSize+"*"+allButtons.length+") + (("+allButtons.length+"-1)*"+marginEach+" + "+marginFirst+") = "+totalButtons+" + "+totalMargin+" = "+(totalButtons + totalMargin));
    return (totalButtons + totalMargin);
}

// Función que a partir del valor de un estilo de tamaño (en este caso queremos sólo en píxeles) devuelve sólo el número sin "px" al final.
function getSize(valor){
	var chars = valor.split('');
	let i = chars.length;
	while(true){
		if(!isNaN(chars[i])){
			break;
		}
		i--;
	}
	valor="";
	for (let j = 0; j <= i; j++) {
		valor += chars[j];
	}
	return parseInt(valor);
}

// Función que despliega el menú a su tamaño total.
function desplegarNiveles(){
    /* Aplicamos estilo */
    if(desplegar.style.width == 0 || desplegar.style.width == "0px"){
        // Calculamos el tamaño total del menú desplegable.
        desplegar.style.width=(calcFullSize(allButtons[0])+"px");
    }else{
        desplegar.style.width = 0;
    }
    /* Le decimos el boton al que hay que dar click para que aplique el estilo. */
    // document.getElementById("boton-desplegable-niveles").onclick = segundo;
}
/* Esto hace que al darle click pliegue el menu */
/* function segundo(){
    document.getElementById("boton-desplegable-niveles").onclick = desplegarNiveles;
    desplegar.style.width="0px";
} */