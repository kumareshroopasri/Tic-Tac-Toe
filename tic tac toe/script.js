let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let scoreX = 0, scoreO = 0;
let player1, player2;

const winPattern = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function startGame() {
    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";

    document.getElementById("players").innerText = `${player1} (X) vs ${player2} (O)`;

    document.getElementById("menuScreen").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");
}

function makeMove(i) {
    if (board[i] !== "") return;

    board[i] = turn;
    document.getElementById("c"+i).innerText = turn;

    playClickSound();

    if (checkWin(turn)) {
        playWinSound();
        showPopup(`${turn} Wins!`);
        confettiStart();

        turn === "X" ? scoreX++ : scoreO++;
        document.getElementById("scoreX").innerText = `X: ${scoreX}`;
        document.getElementById("scoreO").innerText = `O: ${scoreO}`;
        return;
    }

    if (!board.includes("")) {
        playDrawSound();
        showPopup("It's a Draw!");
        return;
    }

    turn = turn === "X" ? "O" : "X";
}

function checkWin(p) {
    return winPattern.some(pattern =>
        pattern.every(index => board[index] === p)
    );
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    document.querySelectorAll(".cell").forEach(c => c.innerText = "");
    document.getElementById("popup").classList.add("hidden");
    confettiStop();
}

function goHome() {
    location.reload();
}

/* Popup */
function showPopup(msg) {
    document.getElementById("popupMessage").innerText = msg;
    document.getElementById("popup").classList.remove("hidden");
}

/* Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* Sound Effects */
const clickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
const winSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4382");
const drawSound = new Audio("https://www.fesliyanstudios.com/play-mp3/6678");

function playClickSound(){ clickSound.play(); }
function playWinSound(){ winSound.play(); }
function playDrawSound(){ drawSound.play(); }

/* 🎉 Confetti */
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

function confettiStart() {
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random()*confettiCanvas.width,
            y: Math.random()*confettiCanvas.height-500,
            spd: Math.random()*4 + 1
        });
    }
    animateConfetti();
}

function animateConfetti() {
    confettiCtx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
    confetti.forEach(c => {
        confettiCtx.fillRect(c.x, c.y, 5, 5);
        c.y += c.spd;
    });
    requestAnimationFrame(animateConfetti);
}

function confettiStop() {
    confetti = [];
}
