const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('penjat');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const bodyParts = [
	[4,2,1,1],
	[4,3,1,2],
	[3,5,1,1],
	[5,5,1,1],
	[3,3,1,1],
	[5,3,1,1]
];

let selectedWord;
let selectedWordFinal;
let usedLetters;
let mistakes;
let hits;

let mensaje = document.getElementById("resultado");
mensaje.style.opacity=0;


const addLetter = letter => {
	const letterElement = document.createElement('span');
	letterElement.innerHTML = letter.toUpperCase();
	usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
	ctx.fillStyle = '#fff';
	ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
	addBodyPart(bodyParts[mistakes]);
	mistakes++;
	//Te dice que has perdido//
	if(mistakes === bodyParts.length){
		document.getElementById("resultado").innerHTML="Has perdut...";
		document.querySelector(".alert").style.opacity = 1;
		endGame();
	}
}

const endGame = () => {
	document.removeEventListener('keydown', letterEvent);
	let letter = document.querySelectorAll(".letter");
	console.log(letter);
	for (let i = 0; i < letter.length; i++) {
		console.log(letter[i].classList.contains("hidden"));
		if (letter[i].classList.contains("hidden")) {
			console.log(letter[i]);
			letter[i].style.color = "#D44949";
		}
	}
	

}

const correctLetter = letter => {
	const { children } =  wordContainer;
	for(let i = 0; i < children.length; i++) {
		if(selectedWord[i] === letter || selectedWordFinal[i] === letter) {
			children[i].classList.toggle('hidden');
			hits++;
		}
	}
	//Te dice que has ganado//
	if(hits === selectedWord.length){
		document.getElementById("resultado").innerHTML="Has guanyat!";
		document.querySelector(".alert").style.opacity = 1;
		endGame();
	}
}

const letterInput = letter => {
	if(selectedWord.includes(letter) || selectedWordFinal.includes(letter)) {
		correctLetter(letter);
	} else {
		wrongLetter();
	}
	addLetter(letter);
	usedLetters.push(letter);
};

const letterEvent = event => {
	let newLetter = event.key.toUpperCase();
	if(newLetter.match(/^[a-zàèéíòóúïüç]$/i) && !usedLetters.includes(newLetter)) {
		letterInput(newLetter);
	};
};

const drawWord = () => {
	selectedWordFinal.forEach(letter => {
		const letterElement = document.createElement('sFpan');
		letterElement.innerHTML = letter.toUpperCase();
		letterElement.classList.add('letter');
		letterElement.classList.add('hidden');
		wordContainer.appendChild(letterElement);
	});
};

const selectRandomWord = () => {
	let index = Math.floor((Math.random() * words.length));
	let word = words[index].toUpperCase();
	let wordFinal = wordsFinal[index].toUpperCase();
	selectedWord = word.split('');
	selectedWordFinal = wordFinal.split('');
};

const drawHangMan = () => {
	ctx.canvas.width  = 300;
	ctx.canvas.height = 400;
	ctx.scale(40, 40);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#83D891';
	ctx.fillRect(0, 7, 4, 1);
	ctx.fillRect(1, 0, 1, 8);
	ctx.fillRect(2, 0, 3, 1);
	ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
	usedLetters = [];
	mistakes = 0;
	hits = 0;
	wordContainer.innerHTML = '';
	usedLettersElement.innerHTML = '';
	startButton.style.marginTop = '5rem';
	startButton.innerHTML = 'Tornar a jugar';
	document.getElementById("resultado").innerHTML="";
	drawHangMan();
	selectRandomWord();
	drawWord();
	document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);