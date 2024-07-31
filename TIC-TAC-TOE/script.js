let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;
let xWins = 0;
let oWins = 0;

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            e.classList.add("box-fill");
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#reset-score").style.display = "inline";
            if (turn === "X") {
                xWins++;
                document.querySelector("#x-wins").innerHTML = xWins;
            } else {
                oWins++;
                document.querySelector("#o-wins").innerHTML = oWins;
            }

            winConditions[i].forEach(index => {
                boxes[index].classList.add("win-highlight");
            });

            return;
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw!";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#reset-score").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    resetGame();
});

document.querySelector("#reset-score").addEventListener("click", () => {
    xWins = 0;
    oWins = 0;
    document.querySelector("#x-wins").innerHTML = xWins;
    document.querySelector("#o-wins").innerHTML = oWins;
    resetGame();
});

function resetGame() {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#reset-score").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.classList.remove("box-fill", "win-highlight");
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
}