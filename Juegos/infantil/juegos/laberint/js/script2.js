var maze = new Array();
var sides = new Array("Border-Top", "Border-Right");

for (var rows = 0; rows < 12; rows++) {
    maze[rows] = new Array();
}
maze[0][0] = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
maze[0][1] = new Array(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1);
maze[1][0] = new Array(1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1);
maze[1][1] = new Array(0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1);
maze[2][0] = new Array(1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1);
maze[2][1] = new Array(0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1);
maze[3][0] = new Array(0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1);
maze[3][1] = new Array(1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1);
maze[4][0] = new Array(0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1);
maze[4][1] = new Array(1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1);
maze[5][0] = new Array(0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0);
maze[5][1] = new Array(1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1);
maze[6][0] = new Array(0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1);
maze[6][1] = new Array(1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1);
maze[7][0] = new Array(1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1);
maze[7][1] = new Array(1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1);
maze[8][0] = new Array(0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0);
maze[8][1] = new Array(0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1);
maze[9][0] = new Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1);
maze[9][1] = new Array(1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1);
maze[10][0] = new Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0);
maze[10][1] = new Array(1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1);
maze[11][0] = new Array(0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0);
maze[11][1] = new Array(1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1);


var color = "rgba(131, 216, 145, 0.99)";

function tryNext(nxt) {
    if ((board.rows[start.rows].cells[start.cols].style.backgroundColor == color) && (nxt.style.backgroundColor ==
            color)) {
        message.innerText = "Veig que has canviat d'opinió.";
        message.style.opacity = 1;
        board.rows[start.rows].cells[start.cols].style.backgroundColor = "";
        return false;
    }
    return true;
}

function moveIt() {
    if (progress) {
        switch (event.keyCode) {
            case 37: // Left
                if (maze[start.rows][1][start.cols - 1] == 0) {
                    if (tryNext(board.rows[start.rows].cells[start.cols - 1]))
                        message.innerText = "Anant cap a l'oest...";
                        message.style.opacity = 1;
                    start.cols--;
                    document.all.board.rows[start.rows].cells[start.cols].style.backgroundColor = color;
                } else {
                    message.innerText = "Ohhh... no pots anar a l'oest.";
                    message.style.opacity = 1;
                }
                break;
            case 38: // Up
                if (maze[start.rows][0][start.cols] == 0) {
                    if (tryNext(board.rows[start.rows - 1].cells[start.cols]))
                        message.innerText = "Anant al nord...";
                        message.style.opacity = 1;
                    start.rows--;
                    document.all.board.rows[start.rows].cells[start.cols].style.backgroundColor = color;
                } else {
                    message.innerText = "Ohhh... no pots anar al nord.";
                    message.style.opacity = 1;
                }
                break;
            case 39: // Right
                if (maze[start.rows][1][start.cols] == 0) {
                    if (tryNext(board.rows[start.rows].cells[start.cols + 1]))
                        message.innerText = "Anant cap a l'est...";
                        message.style.opacity = 1;
                    start.cols++;
                    document.all.board.rows[start.rows].cells[start.cols].style.backgroundColor = color;
                } else {
                    message.innerText = "Ohhh...no pots anar a l'est."
                    message.style.opacity = 1;
                }
                break;
            case 40: // Down
                if (maze[start.rows + 1] == null) return;
                if (maze[start.rows + 1][0][start.cols] == 0) {
                    if (tryNext(board.rows[start.rows + 1].cells[start.cols]))
                        message.innerText = "Anant cap al sud...";
                        message.style.opacity = 1;
                    start.rows++;
                    document.all.board.rows[start.rows].cells[start.cols].style.backgroundColor = color;
                } else {
                    message.innerText = "Ohhh... no pots anar al sud.";
                    message.style.opacity = 1;
                }
                break;
        }
        if (document.all.board.rows[start.rows].cells[start.cols].innerText == "Final") {
            confettiEffect();
            message.innerText = "Has guanyat!";
            message.style.opacity = 1;
            progress = false;
        }
    }
}

