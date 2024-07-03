document.addEventListener('DOMContentLoaded', () => {
    let boxes = document.querySelectorAll(".box");
    let resetButton = document.getElementById("reset");
    let currentPlayer = 'O'; // Start with player O
    let gameState = Array(9).fill(""); // Track game state

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (box.innerText === "" && !isGameOver()) {
                box.innerText = currentPlayer;
                gameState[index] = currentPlayer;
                currentPlayer = currentPlayer === 'O' ? 'X' : 'O'; // Switch player
                if (checkWinner()) {
                    alert(`WINNER: ${gameState[index]}`);
                    disableAllBoxes();
                } else if (gameState.every(cell => cell !== "")) {
                    alert("It's a DRAW!");
                }
            }
        });
    });

    resetButton.addEventListener("click", resetGame);

    function checkWinner() {
        return winPatterns.some(pattern => {
            let [a, b, c] = pattern;
            return gameState[a] !== "" && gameState[a] === gameState[b] && gameState[b] === gameState[c];
        });
    }

    function isGameOver() {
        return checkWinner() || gameState.every(cell => cell !== "");
    }

    function disableAllBoxes() {
        boxes.forEach(box => box.disabled = true);
    }

    function resetGame() {
        gameState.fill("");
        boxes.forEach(box => {
            box.innerText = "";
            box.disabled = false;
        });
        currentPlayer = 'O';
    }
});
