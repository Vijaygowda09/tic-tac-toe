// Selecting all required elements
const selectBox = document.querySelector(".select-box"),
    selectBtnX = selectBox.querySelector(".options .playerX"),
    selectBtnO = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll(".play-area section span"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => { // Once window loaded
    allBox.forEach(box => box.onclick = () => clickedBox(box));
}

selectBtnX.onclick = () => {
    selectBox.classList.add("hide"); // Hide select box
    playBoard.classList.add("show"); // Show the playboard section
}

selectBtnO.onclick = () => {
    selectBox.classList.add("hide"); // Hide select box
    playBoard.classList.add("show"); // Show the playboard section
    players.classList.add("active", "player"); // Set class attributes in players
}

let playerXIcon = "fas fa-times"; // Class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; // Class name of fontawesome circle icon
let playerSign = "X"; // This is a global variable used inside multiple functions
let runBot = true; // This is a global variable to stop the bot once the match is won or drawn

// User click function
function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O"; // If player chooses (O), then change playerSign to O
        element.innerHTML = `<i class="${playerOIcon}"></i>`; // Adding circle icon tag inside user clicked element/box
        players.classList.add("active"); // Add active class in players
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // Adding cross icon tag inside user clicked element/box
        players.classList.add("active"); // Add active class in players
    }
    element.setAttribute("id", playerSign); // Set id attribute in span/box with player chosen sign
    selectWinner(); // Calling selectWinner function
    element.style.pointerEvents = "none"; // Once user selects any box, that box can't be clicked again
    playBoard.style.pointerEvents = "none"; // Add pointerEvents none to playboard so user can't immediately click on any other box until bot selects
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); // Generating random number so bot will randomly delay to select unselected box
    setTimeout(() => bot(), randomTimeDelay); // Calling bot function after random delay
}

// Bot auto select function
function bot() {
    let array = []; // Creating empty array to store unclicked boxes index
    if (runBot) { // If runBot is true
        playerSign = "O"; // Change the playerSign to O so if player has chosen X then bot will O
        allBox.forEach((box, index) => {
            if (!box.childElementCount) { // If the box/span has no children
                array.push(index); // Inserting unclicked boxes number/index inside array
            }
        });
        let randomBox = array[Math.floor(Math.random() * array.length)]; // Getting random index from array so bot will select random unselected box
        if (array.length > 0) { // If array length is greater than 0
            if (players.classList.contains("player")) {
                playerSign = "X"; // If player has chosen O then bot will X
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // Adding cross icon tag inside bot selected element
                players.classList.remove("active"); // Remove active class in players
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; // Adding circle icon tag inside bot selected element
                players.classList.remove("active"); // Remove active class in players
            }
            allBox[randomBox].setAttribute("id", playerSign); // Set id attribute in span/box with player chosen sign
            selectWinner(); // Calling selectWinner function
        }
        allBox[randomBox].style.pointerEvents = "none"; // Once bot selects any box then user can't click on that box
        playBoard.style.pointerEvents = "auto"; // Add pointerEvents auto in playboard so user can again click on box
        playerSign = "X"; // Change the playerSign back to X
    }
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id; // Return id value
}

function checkIdSign(val1, val2, val3, sign) { // Check if all id values are equal to sign (X or O) or not, if yes then return true
    return getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign;
}

function selectWinner() { // If one of the following winning combinations match then select the winner
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) ||
        checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) ||
        checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false; // Stop the bot from running
        setTimeout(() => { // After match won by someone, hide the playboard and show the result box after 1 second
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 1000);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`; // Displaying winning text with playerSign (X or O)
    } else if (Array.from(allBox).every(box => box.childElementCount)) { // If all boxes are clicked and no winner found
        runBot = false; // Stop the bot
        setTimeout(() => { // Hide playboard and show result box after 1 second
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 1000);
        wonText.innerHTML = `Game has been drawn!`; // Displaying drawn text
    }
}

replayBtn.onclick = () => { // Restart the game on replay button click
    runBot = true; // Start the bot
    resultBox.classList.remove("show"); // Hide result box
    allBox.forEach(box => { // Empty all the boxes
        box.innerHTML = "";
        box.removeAttribute("id"); // Remove id attribute from boxes
        box.style.pointerEvents = "auto"; // Make boxes clickable
    });
    players.classList.remove("active"); // Remove active class from players
    selectBox.classList.remove("hide"); // Show select box
}
