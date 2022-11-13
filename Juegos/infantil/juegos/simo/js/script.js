/* DECLARACIÓN DE VARIABLES
================================== */
var niveles = document.querySelectorAll("#contenedor-niveles a");
var ULTIMO_NIVEL = 5; // Esta variable cambiará depende del nivel elegido.
var miJuego = window.primerJuego;

/* VARIABLE CONSTANTE CON ELEMENTOS OBTENIDOS POR ID
===================================================== */
const btnEmpezar = document.getElementById('btnEmpezar');
const rojo = document.getElementById("rojo");
const azul = document.getElementById("azul");
const amarillo = document.getElementById("amarillo");
const verde = document.getElementById("verde");

/* DECLARACIÓN DE CLASES PROTOTIPALES
================================== */
class Juego {
	constructor() {
		// Ejecutando mis métodos
		this.inicializar();
		this.generarSecuencia();

		// Esperando 1.5 segundos antes de ejecutar this.siguienteNivel
		setTimeout(() => this.siguienteNivel() , 1500);
	}

	// Método que se ejecuta cuando empieza el juego
	inicializar() {
		/* this.jugador = {
			nombre: "Mildred",
			apellido: "Guerra",
			nivel: "Junior"
		} */
		/* LISTA DE BINDs 
		=================== */
		this.siguienteNivel = this.siguienteNivel.bind(this);
		this.elegirColor = this.elegirColor.bind(this);
		// Ahora el this esta atado al this de la clase prototipo juego
		this.inicializar = this.inicializar.bind(this);

		this.nivel = 1;
		this.colores = {
			rojo,
			azul,
			verde,
			amarillo
		}

		// niveles.forEach((element,i) => {
		// 	element.removeEventListener("click",this.cambiarNivel(i));
		// })

		let colores = document.querySelectorAll(".color");
		for (let i = 0; i < colores.length; i++) {
			colores[i].style.cursor= "pointer";
		}

		btnEmpezar.classList.toggle('hide');
	}


	generarSecuencia() {
		this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.round(Math.random() * 3));
		/* Creamos un nuevo objeto Array con 10 casillas
		Rellenamos cada casilla con 0
		Math random * 4 entrega un valor entre 0 y 3
		map() solo funciona si el elemento del array tiene un valor asi sea 
		Ejemplo de secuencia , secuencia = [0,0,2,1] */
	}

	siguienteNivel() {
		this.subnivel = 0;
		this.iluminarSecuencia();
		this.agregarEventosClick();
	}

	transformarNumeroAColor(numero) {
		// Pedimos como parametro un numero aleatorio entre 0 y 4 que viene de this.secuencia()
		switch (numero) {
			case 0:
				return "rojo";
				// El break no hace falta porque el return hace que no se ejecute.
			case 1:
				return "azul";
			case 2: 
				return "verde";
			case 3:
				return "amarillo";
		}
	}

	transformarColorANumero(color) {
		// Pedimos como parametro un numero aleatorio entre 0 y 4 que viene de this.secuencia()
		switch (color) {
			case "rojo":
				return 0;
				// El break no hace falta porque el return hace que no se ejecute.
			case "azul":
				return 1;
			case "verde": 
				return 2;
			case "amarillo":
				return 3;
		}
	}

	iluminarSecuencia() {		
			/* Aplicamos i < this.nivel porque el numero del nivel 
			corresponde al numero de elementos que le usuario 
			modificara y tendra que seguir. */
		for (let i = 0; i < this.nivel ; i++) {
			const color = this.transformarNumeroAColor(this.secuencia[i]);
			// Ej: const color = "amarillo" 
			setTimeout(() => this.iluminarColor(color) , 1000 * i);
			// Colocar x * i nos permite acumular tiempo en función del for
		}
	}

	iluminarColor(color) {
		// Colocando la clase que ilumina el color.
		this.colores[color].classList.add("light");
		setTimeout(() => this.apagarColor(color), 350);
	}

	apagarColor(color) {
		// Quitando la clase que ilumina el color.
		this.colores[color].classList.remove("light");
	}

	agregarEventosClick() {
		// Agregando un manejador de eventos
		this.colores.rojo.addEventListener("click", this.elegirColor);
		this.colores.azul.addEventListener("click", this.elegirColor);
		this.colores.verde.addEventListener("click", this.elegirColor);
		this.colores.amarillo.addEventListener("click", this.elegirColor);
	}
		// Los métodos que se llaman en el event listener suelen tener en la funcion un parametro uv.

	removeEventosClick() {
		// Agregando un manejador de eventos.
		this.colores.rojo.removeEventListener("click", this.elegirColor);
		this.colores.azul.removeEventListener("click", this.elegirColor);
		this.colores.verde.removeEventListener("click", this.elegirColor);
		this.colores.amarillo.removeEventListener("click", this.elegirColor);
	}
		// Los métodos que se llaman en el event listener suelen tener en la funcion un parametro uv.

	static cambiarNivel(level,miJuego){
		if(level == Array.prototype.indexOf.call(niveles, document.getElementById("aSeleccionado")))return;
		for (let i = 0; i < niveles.length; i++) {
			niveles[i].id = "";
		}
		niveles[level].id="aSeleccionado";
		console.log("Hemos cambiado de nivel.")
		ULTIMO_NIVEL = (level+1)*5;
		btnEmpezar.classList.remove('hide');
		if(miJuego == undefined) return;
		miJuego.removeEventosClick();
	}

	elegirColor(ev) {
		const nombreColor = ev.target.dataset.color;
		const numeroColor = this.transformarColorANumero(nombreColor);
		this.iluminarColor(nombreColor);

		/* ¿Que resultado quiero?
		Quiero que se verifique cuando el usuario haga click en un boton,
		y si es igual felicitarme 
		y pasar al siguiente nivel si toque todos los de la secuencia de este nivel
		sino seguir el nivel hasta tocar el siguiente
		sino toco bien que me diga que perdi y acabe el juego */
		let turno = this.subnivel + 1;
		if (numeroColor === this.secuencia[this.subnivel]) {
			this.subnivel++;
			if (turno === this.nivel) {		
				this.nivel++;
				this.removeEventosClick();
				if (this.nivel === (ULTIMO_NIVEL + 1)) {
					this.ganoElJuego();
				}
				else {
					this.pasasteDeNivel();
				}
			}
			// console.log("sigue jugando");
		}
		else {
			this.perdioElJuego();
		}
	}

	/* MÉTODOS DE TIPO RENDER EN PANTALLA 
	====================================== */
	pasasteDeNivel() {
		swal(` Has passat el nivell!`, `Dóna el millor de tu al següent nivell: ${this.nivel}`, "success")
		.then(() => {
			// this.generarSecuencia()
			setTimeout(this.siguienteNivel, 1000);
			// Recuerda que el this fue modificado para apuntar a Juego
		});
	}

	ganoElJuego() {
		// Este swal es una promesa
		swal(`Enhorabona!`, `Has guanyat!`, "success")
		.then(() => {
			// Agrego este método para que el juego arranque de nuevo
			this.inicializar();
			document.querySelector("#canvas").style.opacity = 0;
		})
		confettiEffect();
	}

	perdioElJuego() {
		swal(`T'has equivocat`, `Posa més atenció la pròxima vegada`, "error")
		.then(() => {
			this.removeEventosClick();
			// Agrego este método para que el juego arranque de nuevo
			this.inicializar();
		});
	}
}

/* DECLARACIÓN DE FUNCIONES
======================================================== */
function empezarJuego() {
	// alert("El juego va a comenzar pueblo de bolivar")
	miJuego = new Juego();
}
niveles.forEach((element,i) => {
	element.addEventListener("click",() => {
		Juego.cambiarNivel(i,miJuego)
			// empezarJuego();
	});
})