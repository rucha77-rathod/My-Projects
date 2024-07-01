let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
let bd = document.querySelector("body");
const userScorepara = document.querySelector("#user-score");
const compScorepara = document.querySelector("#comp-score");


const genCompChoice = () => {
    //rock , paper ,scissors
    let opt = ['rock', 'paper', 'scissors'];
    const randomIdx = Math.floor(Math.random() * 3);
    return opt[randomIdx];

}

const drawGame = () => {
    //console.log("Game is dropped");
    msg.innerText = "Game is dropped, Play again";
    msg.style.backgroundColor = "";
    bd.style.backgroundImage = "";
    bd.style.backgroundColor = "red";

}


const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {

        userScore++;
        userScorepara.innerText = userScore;
        console.log("You Win ");
        msg.innerText = (`You Win ! Your ${userChoice} beats ${compChoice}`);
        msg.style.backgroundColor = "green";
        bd.style.backgroundImage = "url('./images/win.png')";
        bd.style.backgroundSize = "cover";
        bd.style.backgroundColor = "";

    } else {
        compScore++;
        compScorepara.innerText = compScore;
        console.log("You Lose");
        msg.innerText = (`You Lose , ${compChoice} beats your ${userChoice}`);
        msg.style.backgroundColor = "red";
        bd.style.backgroundImage = "";
        bd.style.backgroundColor = "";
    }
};

const playGame = (userChoice) => {
    console.log("user choice =", userChoice);
    //Generate computer choice -> 
    const compChoice = genCompChoice();
    console.log("Computer choice=", compChoice);

    if (userChoice == compChoice) {
        //draw game
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            //scissors,rock
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            //rock,paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    //console.log(choice);
    choice.addEventListener("click", () => {

        const userChoice = choice.getAttribute("id");
        //console.log(userChoice,"choice was clicked");
        playGame(userChoice);

    });
});

