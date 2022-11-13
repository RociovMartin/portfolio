let levels = 5;
let keys;
let keysSpeed = 1000;
const keyboardKeys = document.querySelectorAll('.key');
const keyboardKeysLength = keyboardKeys.length;
let keyboard = document.getElementById('keyboard');

var niveles = document.querySelectorAll("#contenedor-niveles a");

const start = () => {
  document.querySelector("#btnEmpezar").style.visibility="hidden";
  keyboard.classList.add('active');
  keys = generateKeys(levels);
  nextLevel(0);
};

function cambiarNivel(level){
  switch (level) {
    case 2:
      levels = 15;
      keysSpeed = 600;
      start();
      break;
      
    case 1:
      levels = 10;
      keysSpeed = 800;
      start();
      break;

    case 0:
      levels = 5;
      keysSpeed = 1000;
      start();
      break;

    default: break;
    
  }
}
// inicio
function empezarJuego() {
	// alert("El juego va a comenzar pueblo de bolivar")
	start();
}
niveles.forEach((element,i) => {
	element.addEventListener("click",() => {
		Juego.cambiarNivel(i,miJuego)
			// empezarJuego();
	});
})

niveles.forEach((element,i) => {
	element.addEventListener("click",() => {
		cambiarNivel(i)
			// empezarJuego();
	});
})
function nextLevel(currentLevel) {
  if (currentLevel == levels) {
    return swal({
      title: 'Vas guanyar!',
      type: 'success',
      text: `Vols tornar a jugar?`,
      buttons: ['No', 'Si']
    }).then(ok => {
      if (ok) start;
    });
  }

  swal({
    timer: 1000,
    title: `Level ${currentLevel + 1} / ${levels}`,
    button: false
  });

  // Computer shows the current sequence
  for (let i = 0; i <= currentLevel; i++) {
    setTimeout(() => activate(keys[i]), (keysSpeed * (i + 1) + 1000));
  }

  // Pointer is on first sequence position
  let i = 0;
  let currentKeyCode = keys[i];
  window.addEventListener('keydown', onkeydown);
  for (let k = 0; k < keyboardKeysLength; k++) {
    keyboardKeys[k].addEventListener('click', onclick);
  }

  function onkeydown(ev) {
    keyPressed(ev.keyCode);
  }

  function onclick(ev) {
    keyPressed(ev.target.innerHTML.toUpperCase().charCodeAt(0));
  }

  function keyPressed(key) {
    if (key == currentKeyCode) {
      activate(currentKeyCode, { success: true });
      i++;
      if (i > currentLevel) {
        window.removeEventListener('keydown', onkeydown);
        for (let k = 0; k < keyboardKeysLength; k++) {
          keyboardKeys[k].removeEventListener('click', onclick);
        }
        setTimeout(() => nextLevel(i), 1500);
      }
      currentKeyCode = keys[i];
    } else {
      activate(key, { fail: true });
      window.removeEventListener('keydown', onkeydown);
      for (let k = 0; k < keyboardKeysLength; k++) {
        keyboardKeys[k].removeEventListener('click', onclick);
      }
      setTimeout(() => {
        swal({
          title: 'Has perdut',
          icon: 'error',
          text: `Vas empènyer ${String.fromCharCode(
            key
          ).toUpperCase()} i hauries d'empènyer ${String.fromCharCode(
            keys[i]
          )}\n\nVols tornar-ho a provar?`,
          buttons: ['No', 'Si']
        }).then(ok => {
          if (ok) start();
          else {
            swal('Gràcies per jugar!');
          }
        });
      }, 1000);
    }
  }
}

function generateRandomKey() {
  const min = 65;
  const max = 90;
  return Math.round(Math.random() * (max - min) + min);
}

function generateKeys(levels) {
  return new Array(levels).fill(0).map(generateRandomKey);
}

function getElementByKeyCode(keyCode) {
  return document.querySelector(`[data-key="${keyCode}"]`);
}

function activate(keyCode, opts = {}) {
  const el = getElementByKeyCode(keyCode);
  el.classList.add('active');
  if (opts.success) {
    el.classList.add('success');
  } else if (opts.fail) {
    el.classList.add('fail');
  }
  setTimeout(() => deactivate(el), 500);
}

function deactivate(el) {
  el.className = 'key';
}