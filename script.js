const selectBox = document.querySelector(".select-box"),
      selectBtnX = selectBox.querySelector(".options .playerX"),
      selectBtnO = selectBox.querySelector(".options .playerO"),
      playBoard = document.querySelector(".play-board"),
      players = document.querySelector(".players"),
      allBox = document.querySelectorAll("section span"),
      resultBox = document.querySelector(".result-box"),
      wonText = resultBox.querySelector(".won-text"),
      replayBtn = resultBox.querySelector("button");

window.onload = () => {
    allBox.forEach(box => box.setAttribute("onclick", "clickedBox(this)"));
}

selectBtnX.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.classList.add("active", "player");
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    setTimeout(() => bot(), Math.random() * 1000 + 200);
}

function bot() {
    let array = [];
    if (runBot) {
        playerSign = "O";
        allBox.forEach((box, i) => {
            if (box.childElementCount === 0) array.push(i);
        });
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove("active");
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
            }
            allBox[randomBox].setAttribute("id", playerSign);
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    return getIdVal(val1) === sign && getIdVal(val2) === sign && getIdVal(val3) === sign;
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) ||
        checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) ||
        checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 1000);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else if ([...allBox].every(box => box.id)) {
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 1000);
        wonText.innerHTML = `It's a <p>tie</p>`;
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}
