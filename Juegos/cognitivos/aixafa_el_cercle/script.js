const squares = document.querySelectorAll('.square')
const cir = document.querySelector('.cir')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

var niveles = document.querySelectorAll("#contenedor-niveles a");

let result = 0
let hitPosition
let currentTime = 60
let timerId = null
let countDownTimerId = null
let interval=1100

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('cir');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('cir');

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++
      score.textContent = result
      hitPosition = null
    }
  })
})


function moveElef() {
  timeLeft.textContent = currentTime 
  timerId = setInterval(randomSquare, interval)
  countDownTimerId = setInterval(countDown, 1000)
  document.getElementsByClassName("hidden")[0].style.visibility="visible";
  document.getElementsByClassName("hidden")[1].style.visibility="visible";
  document.getElementById("btnEmpezar").style.display="none";
}

function fin(){
  squares.forEach(square => {
    square.classList.remove('cir')
  })
  currentTime=0
  timeLeft.textContent = currentTime
  score.textContent = result
  clearInterval(countDownTimerId)
  clearInterval(timerId)
}

function countDown() {
 currentTime--
 timeLeft.textContent = currentTime

 if (currentTime == 0) {
   fin()
   
 }

}


function cambiarNivel(level){
  if(level == Array.prototype.indexOf.call(niveles, document.getElementById("aSeleccionado")))return;
  for (let i = 0; i < niveles.length; i++) {
    niveles[i].id = "";
  }
  niveles[level].id="aSeleccionado";
  console.log("Hemos cambiado de nivel.")
  
  result=0
  fin()
  currentTime=60-((level)*10) // facil=60s, mitja=50s, dificil=40s, molt difícil=30s
  interval=1100-((level)*100) //facil=1.1s, mitja=1s, dificil=0.9s, molt dificil=0.8s

  document.getElementById("btnEmpezar").style.display="initial";
  document.getElementsByClassName("hidden")[0].style.visibility="hidden";
  document.getElementsByClassName("hidden")[1].style.visibility="hidden";
}
niveles.forEach((element,i) => {
	element.addEventListener("click",() => {
		cambiarNivel(i)
			// empezarJuego();
	});
})