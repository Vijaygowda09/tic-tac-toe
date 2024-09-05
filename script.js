const selectBox = document.querySelector(".select-box"),
    selectBtnX = selectBox.querySelector(".playerX"),
    selectBtnO = selectBox.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll("section span"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times"; // FontAwesome cross icon
let playerOIcon = "far fa-circle"; // FontAwesome circle icon
let playerSign = "X"; // Current player sign
let runBot = true; // Flag to control bot actions

window.onload = () => {
    allBox.forEach(box => {
        box.addEventListener("click", () => clickedBox(box));
    });
};

selectBtnX.addEventListener("click", () => {
    startGame();
});

selectBtnO.addEventListener("click", () => {
    startGame();
    players.classList.add("active"); // Set class for player O
});

function startGame() {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

function clickedBox(element) {
    if (!element.childElementCount) {
        element.innerHTML = `<i class="${playerSign === "X" ? playerXIcon : playerOIcon}"></i>`;
        element.setAttribute("id", playerSign);
        element.style.pointerEvents = "none"; // Disable further clicks
        selectWinner();
        playerSign = playerSign === "X" ? "O" : "X"; // Switch players
        players.classList.toggle("active");
    }
}

function getIdVal(classname) {
    return document.querySelector(`.box${classname}`).id;
}

function checkIdSign(val1, val2, val3, sign) {
    return getIdVal(val1) === sign && getIdVal(val2) === sign && getIdVal(val3) === sign;
}

function selectWinner() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7] // Diagonals
    ];

    for (const combo of winningCombinations) {
        if (checkIdSign(...combo, playerSign)) {
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
                wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
            }, 100);
            return;
        }
    }

    if ([...allBox].every(box => box.childElementCount)) {
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.textContent = "Match has been drawn!";
        }, 100);
    }
}

replayBtn.addEventListener("click", () => {
    allBox.forEach(box => {
        box.innerHTML = '';
        box.removeAttribute("id");
        box.style.pointerEvents = "auto";
    });
    resultBox.classList.remove("show");
    playBoard.classList.remove("show");
    selectBox.classList.remove("hide");
    playerSign = "X"; // Reset player sign
    runBot = true; // Restart bot
});
