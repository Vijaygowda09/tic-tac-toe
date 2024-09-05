const selectBox = document.querySelector(".select-box"),
    selectBtnX = selectBox.querySelector(".options .playerX"),
    selectBtnO = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll("section span"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

let playerSign = "X";
let runBot = true;

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
};

selectBtnX.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
};

selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.classList.add("active");
    playerSign = "O";
};

function clickedBox(element) {
    if (players.classList.contains("active")) {
        playerSign = "O";
        element.innerHTML = <i class="far fa-circle"></i>;
        element.setAttribute("id", playerSign);
        players.classList.remove("active");
    } else {
        element.innerHTML = <i class="fas fa-times"></i>;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    element.style.pointerEvents = "none";
    selectWinner();
    playBoard.style.pointerEvents = "none";

    if (runBot) {
        let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
        setTimeout(() => bot(), randomTimeDelay);
    }
}

function bot() {
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
            array.push(i);
        }
    }
    if (array.length > 0) {
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (players.classList.contains("active")) {
            playerSign = "X";
            allBox[randomBox].innerHTML = <i class="fas fa-times"></i>;
            players.classList.remove("active");
        } else {
            playerSign = "O";
            allBox[randomBox].innerHTML = <i class="far fa-circle"></i>;
            players.classList.add("active");
        }
        allBox[randomBox].setAttribute("id", playerSign);
        allBox[randomBox].style.pointerEvents = "none";
        selectWinner();
    }
    playBoard.style.pointerEvents = "auto";
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    return getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign;
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) ||
        checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) ||
        checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {

        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = Player <p>${playerSign}</p> won the game!;
    } else {
        if (getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" &&
            getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" &&
            getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {

            runBot = false;
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
};
