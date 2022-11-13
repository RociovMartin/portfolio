/*PROTOCOLO DE VERIFICACIÓN DE FUNCIONAMIENTO
==================================*/
//Imprimiendo algo en la consola
console.log("inicializando archivo");

/*DECLARACIÓN DE VARIABLES
==================================*/

/*VARIABLE CONSTANTE CON ELEMENTOS OBTENIDOS POR ID
=====================================================*/
const btnEmpezar = document.getElementById('btnEmpezar');
const rojo = document.getElementById("rojo");
const azul = document.getElementById("azul");
const amarillo = document.getElementById("amarillo");
const verde = document.getElementById("verde");
const ULTIMO_NIVEL = 5;

/*DECLARACIÓN DE CLASES PROTOTIPALES
==================================*/

class Juego {
	constructor() {
		/*Ejecutando mis metodos*/
		this.inicializar();
		this.generarSecuencia();

		/*Esperando 1.5 segundos antes de ejecutar this.siguienteNivel */
		setTimeout( () => this.siguienteNivel() , 1500 );
	}

	//Metodo que se ejecuta cuando empieza el juego
	inicializar() {
		this.jugador = {
			nombre: "Mildred",
			apellido: "Guerra",
			nivel: "Junior"
		}
		/*LISTA DE BIND s 
		===================*/
		this.siguienteNivel = this.siguienteNivel.bind(this);
		this.elegirColor = this.elegirColor.bind(this);
		//ahora el this esta atado al this de la clase prototipo juego
		this.inicializar = this.inicializar.bind(this);

		this.nivel = 1;
		this.colores = {
			rojo,
			azul,
			verde,
			amarillo
		}

		let colores = document.querySelectorAll(".color");
		for (let i = 0; i < colores.length; i++) {
			colores[i].style.cursor= "pointer";
		}

		btnEmpezar.classList.toggle('hide');
	}


	generarSecuencia() {
		this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.round(Math.random() * 3 ));
		//Creamos un nuevo objeto Array con 10 casillas
		//rellenamos cada casilla con 0
		// Math random * 4 entrega un valor entre 0 y 3
		//map() solo funciona si el elemento del array tiene un valor asi sea 
		/*
		Ejemplo de secuencia , secuencia = [0,0,2,1]
		*/
	}

	siguienteNivel() {
		this.subnivel = 0;
		this.iluminarSecuencia();
		this.agregarEventosClick();
	}

	transformarNumeroAColor(numero) {
		//Pedimos como parametro un numero aleatorio entre 0 y 4 que viene de this.secuencia()
		switch (numero) {
			case 0:
				return "rojo";
				//el case no hace falta porque el return hace que no se ejecute
			case 1:
				return "azul";
			case 2: 
				return "verde";
			case 3:
				return "amarillo";
		}
	}

	transformarColorANumero(color) {
		//Pedimos como parametro un numero aleatorio entre 0 y 4 que viene de this.secuencia()
		switch (color) {
			case "rojo":
				return 0;
				//el break no hace falta porque el return hace que no se ejecute
			case "azul":
				return 1;
			case "verde": 
				return 2;
			case "amarillo":
				return 3;
		}
	}

	iluminarSecuencia() {		
			/*aplicamos i < this.nivel porque el numero del nivel 
			corresponde al numero de elementos que le usuario 
			modificara y tendra que seguir */
		for (let i =0; i < this.nivel ; i++) {
			const color = this.transformarNumeroAColor(this.secuencia[i]);
			// Ej: const color = "amarillo" 
			setTimeout( () => this.iluminarColor(color) , 1000 * i);
			//colocar x * i nos permite acumular tiempo en función del for
		}
	}

	iluminarColor(color) {
		//Colocando la clase que ilumina el color
		this.colores[color].classList.add("light");
		setTimeout(() => this.apagarColor(color), 350);
	}

	apagarColor(color) {
		//Quitando la clase que ilumina el color
		this.colores[color].classList.remove("light");
	}

	agregarEventosClick() {
		//agregando un manejador de eventos
		this.colores.rojo.addEventListener("click", this.elegirColor );
		this.colores.azul.addEventListener("click", this.elegirColor );
		this.colores.verde.addEventListener("click", this.elegirColor );
		this.colores.amarillo.addEventListener("click", this.elegirColor );
		}
		//los metodos que se llaman en el event listener suelen tener en la funcion un parametro uv

	removerEventosClick() {
		//agregando un manejador de eventos
		this.colores.rojo.removeEventListener("click", this.elegirColor );
		this.colores.azul.removeEventListener("click", this.elegirColor );
		this.colores.verde.removeEventListener("click", this.elegirColor );
		this.colores.amarillo.removeEventListener("click", this.elegirColor );
		}
		//los metodos que se llaman en el event listener suelen tener en la funcion un parametro uv

		elegirColor(ev) {
			const nombreColor = ev.target.dataset.color;
			const numeroColor = this.transformarColorANumero(nombreColor);
			this.iluminarColor(nombreColor);

			/*
			¿Que resultado quiero?
			Quiero que se verifique cuando el usuario haga click en un boton,
			y si es igual felicitarme 
			y pasar al siguiente nivel si toque todos los de la secuencia de este nivel
			sino seguir el nivel hasta tocar el siguiente
			sino toco bien que me diga que perdi y acabe el juego
			*/
			let turno = this.subnivel + 1;
			if (numeroColor === this.secuencia[this.subnivel] ) {
				this.subnivel++;
				if (turno === this.nivel ) {		
					this.nivel++;
					this.removerEventosClick();
					if (this.nivel === (ULTIMO_NIVEL + 1) ) {
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


		/*METODOS DE TIPO RENDER EN PANTALLA 
		======================================*/
		pasasteDeNivel() {
			swal(` Has passat el nivell!`, `Dóna el millor de tu al següent nivell: ${this.nivel}`, "success")
			.then(() => {
				//this.generarSecuencia()
				setTimeout(this.siguienteNivel, 1000);
				//recuerda que el this fue modificado para apuntar a Juego
			})
		}

		ganoElJuego() {
			//este swal es una promesa
			swal(`Enhorabona!`, `Has guanyat!`, "success")
			.then(() => {
					//agrego este metodo para que el juego arranque de nuevo
					this.inicializar();
				})
			confettiEffect();
		}


		perdioElJuego() {
			swal(`T'has equivocat`, `Posa més atenció la pròxima vegada`, "error")
			.then(() => {
					this.removerEventosClick();
					//agrego este metodo para que el juego arranque de nuevo
					this.inicializar();
				})
		}
}
    

/*DECLARACIÓN DE FUNCIONES
========================================================*/

function empezarJuego() {
	//	alert("El juego va a comenzar pueblo de bolivar")
	window.primerJuego = new Juego();
	document.querySelector("#canvas").style.opacity = 0;
}

/*EJECUCIÓN DE FUNCIONES Y PROMESAS
========================================0*/

/*RENDER EN PANTALLA
=======================================*/

//VARIABLES REASIGNABLES
// let temaClase = "Simó";
// let titulo = document.getElementById("title");
//var contenidoClase = document.getElementById("contenido-clase")

//VARIABLES REASIGNADAS
// titulo.innerHTML=  temaClase;

//contenidoClase.innerHTML= temaClase;

/*
===============================================================================
LOGICA DEL VIDEOJUEGO
---------------------
=>Va a ser un simon
=> 10 niveles
=> Tengo una secuencia aleatoria que tiene que seguir el usuario
=> "Y asi sucesivamente"
IDEAS CLAVES
-------------
usa breakpoint
=> 
Control de errores
-----------------
el this apuntaba a Window cuando debia apuntar a Juego
------------------------------
===================================================================================================================== 
		FEATURES POR AGREGAR
		=> Header con datos sobre el nombre del jugador , frase potente, nivel donde va, numero de intentos
		=> Formulario swal para pedirle el nombre al jugador
		=> Metodo de quieres jugar de nuevo o no
		=> Aceleracion del tiempo a medida que aumenta el nivel
		*/